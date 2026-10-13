import { NextRequest, NextResponse } from "next/server";
import { exchangeCode } from "@/api/spotify/auth";
import { getSpotifySession } from "@/api/spotify/session";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");

    const session = await getSpotifySession();

    if (error) {
        console.log("error authenticating");
        delete session.oauthState;
        await session.save();
        return NextResponse.redirect(
            new URL("/?spotify_error=access_denied", request.url)
        );
    }

    console.log("code: ", code);
    console.log("state: ", state);
    console.log(session.oauthState);

    if (
        !code ||
        !state ||
        !session.oauthState ||
        state !== session.oauthState
    ) {
        return NextResponse.redirect(
            new URL("/?spotify_error=invalid_state", request.url)
        );
    }

    try {
        await exchangeCode(code);

        return NextResponse.redirect(
            new URL("/?connected=true", request.url)
        );
    } catch {
        return NextResponse.redirect(
            new URL("/?spotify_error=connection_failed", request.url)
        );
    }
}