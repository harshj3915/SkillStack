import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: "Search query is required" }, { status: 400 });
        }

        const API_KEY = process.env.YOUTUBE_API_KEY;
        const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${encodeURIComponent(query + ' full course')}&safeSearch=strict&type=video&videoEmbeddable=true&videoSyndicated=true&videoCategoryId=27&videoDuration=long&key=${API_KEY}`;

        const response = await fetch(YOUTUBE_API_URL, {
            method: "GET",
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: "Failed to fetch YouTube data", details: errorText }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
