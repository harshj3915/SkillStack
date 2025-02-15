import { getServerSession } from "next-auth";
import { authOption as authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { id } = await req.json();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "User not authorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const enrolledVideo = await prisma.UserVideoProgress.findUnique({
            where: { userId: user.id, id: id },
            select: { videoId: true, isCompleted: true, atTime: true },
        });

        if (!enrolledVideo) {
            return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
        }

        const API_KEY = process.env.YOUTUBE_API_KEY;
        const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${enrolledVideo.videoId}&key=${API_KEY}`;

        const response = await fetch(YOUTUBE_API_URL);

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch video details" }, { status: response.status });
        }

        const videoData = await response.json();

        return NextResponse.json({
            video: {
                ...enrolledVideo,
                details: videoData.items?.[0] || {},
            },
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching course:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, maxTime } = await req.json();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "User not authorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const enrolledVideo = await prisma.UserVideoProgress.findUnique({
            where: { userId: user.id, id: id },
            select: { atTime: true },
        });

        if (!enrolledVideo) {
            return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
        }


        if(enrolledVideo.totalDuration - maxTime < 180){
            await prisma.UserVideoProgress.update({
                where: { userId: user.id, id: id },
                data: { isCompleted: true ,atTime: enrolledVideo.totalDuration},
            });
        }
        else if(maxTime>enrolledVideo.atTime){
            await prisma.UserVideoProgress.update({
                where: { userId: user.id, id: id },
                data: { atTime: maxTime },
            });

        }

        return NextResponse.json({ success: true, newAtTime: maxTime }, { status: 200 });

    } catch (error) {
        console.error("Error updating progress:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
