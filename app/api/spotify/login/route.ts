import { NextResponse } from 'next/server';
import { beginSpotifyLogin } from "@/api/spotify/auth";

export async function GET() {
    const url = await beginSpotifyLogin();
    return NextResponse.redirect(url);
}