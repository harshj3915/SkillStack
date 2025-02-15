import { getServerSession } from "next-auth";
import { authOption as authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req) {
    
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { Id } = await req.json();
        if (!Id) {
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
                id: Id,
            },
        });

        if (!existingProgress) {
            return NextResponse.json({ message: "Course not found!" }, { status: 409 });
        }

        

        await prisma.userVideoProgress.delete({
            where: {
                userId: user.id,
                id: Id,
            },
        })

        return NextResponse.json({ message: "Video deleted successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Error adding course:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
