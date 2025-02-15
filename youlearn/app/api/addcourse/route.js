import { getServerSession } from "next-auth";
import { authOption as authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

import { NextResponse } from "next/server";

function isoDurationToSeconds(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);

    return hours * 3600 + minutes * 60 + seconds;
}

export async function POST(req) {
    
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { videoId } = await req.json();
        if (!videoId) {
            return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const existingProgress = await prisma.userVideoProgress.findFirst({
            where: {
                userId: user.id,
                videoId: videoId,
            },
        });

        if (existingProgress) {
            return NextResponse.json({ message: "Course already added!" }, { status: 409 });
        }

        const API_KEY = process.env.YOUTUBE_API_KEY;
        const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    
        const response = await fetch(YOUTUBE_API_URL, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
        });
    
        if (!response.ok) {
          return NextResponse.json({ error: 'Failed to fetch video details' }, { status: 409 });
        }
    
        const data = await response.json();


        await prisma.userVideoProgress.create({
            data: {
                userId: user.id,
                videoId,
                isCompleted: false,
                totalDuration: isoDurationToSeconds(data.items[0].contentDetails.duration),
            },
        });

        return NextResponse.json({ message: "Video added successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Error adding course:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
