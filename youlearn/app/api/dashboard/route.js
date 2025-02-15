import { getServerSession } from "next-auth";
import { authOption as authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3/videos";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ message: "User not authorized" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, email: true, name: true },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        const enrolledVideos = await prisma.userVideoProgress.findMany({
            where: { userId: user.id },
            select: {
                videoId: true,
                isCompleted: true,
                createdAt: true,
                updatedAt: true,
                atTime: true,
                id:true
            },
        });

        const videoIds = enrolledVideos.map(video => video.videoId).join(",");

        if (!videoIds) {
            return NextResponse.json({ user, enrolledVideos: [] }, { status: 200 });
        }

        const response = await fetch(
            `${YOUTUBE_API_URL}?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`,
            {
                method: "GET",
                headers: { Accept: "application/json" },
            }
        );

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch video details" }, { status: response.status });
        }

        const videoData = await response.json();

        const enrichedVideos = enrolledVideos.map(video => {
            const videoDetails = videoData.items.find(item => item.id === video.videoId);
            return {
                ...video,
                details: videoDetails || null,
            };
        });

        return NextResponse.json({ enrolledVideos: enrichedVideos }, { status: 200 });

    } catch (error) {
        console.error("Error in listofenrolled:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
