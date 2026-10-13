import { NextRequest, NextResponse } from "next/server";
import { spotifyFetch } from "@/api/spotify/client";
import { TimeRange } from "@/types/enums/timeRange";

export async function GET(request: NextRequest) {
    const range = request.nextUrl.searchParams.get("time_range") ?? TimeRange.MEDIUM_TERM;

    try {
        const data = await spotifyFetch(
            `/me/top/artists?time_range=${range}&limit=50`
        );

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Unable to retrieve top artists. Reconnect Spotify if needed." },
            { status: 502 }
        );
    }
}