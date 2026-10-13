import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="mx-auto max-w-xl space-y-6 px-6 py-24">
            <p className="text-sm font-medium text-primary">
                MOODIFY
            </p>

            <h1 className="text-4xl font-bold">
                Your music, your mood.
            </h1>

            <p className="text-muted">
                Discover the music that defines your listening habits.
            </p>

            <Link href="/api/spotify/login">
                <Button>
                    Connect Spotify
                </Button>
            </Link>

        </main>
    );
}