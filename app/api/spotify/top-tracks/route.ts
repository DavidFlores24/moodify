import { NextRequest, NextResponse } from "next/server";
import { spotifyFetch } from "@/api/spotify/client";
import { TimeRange } from "@/types/enums/timeRange";

export async function GET(request: NextRequest) {
    const range = request.nextUrl.searchParams.get("time_range") ?? TimeRange.MEDIUM_TERM;

    try {
        console.log("attempting to fetch");
        const data = await spotifyFetch(
            `/me/top/tracks?time_range=${range}&limit=50`
        );

        console.log(data);

        return NextResponse.json(data);
    } catch(error) {
        console.log(error);
        return NextResponse.json(
            { error: "Unable to retrieve top tracks. Reconnect Spotify if needed." },
            { status: 502 }
        );
    }
}