import { getServerSession } from "next-auth";
import { authOption as authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ enrolledIds: [] }, { status: 200 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ enrolledIds: [] }, { status: 200 });
        }

        const enrolledVideos = await prisma.userVideoProgress.findMany({
            where: { userId: user.id },
            select: { videoId: true },
        });

        const enrolledIds = enrolledVideos.map((video) => video.videoId);

        return NextResponse.json({ enrolledIds }, { status: 200 });

    } catch (error) {
        console.error("Error in listofenrolled:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
