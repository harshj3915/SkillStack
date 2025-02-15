import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { videoId } = await req.json();
    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
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
      return NextResponse.json({ error: 'Failed to fetch video details' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
