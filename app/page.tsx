"use client";

import {useState} from "react";
import {MoodSelector} from "@/components/ui/MoodSelector";
import {TimeframeSelector} from "@/components/ui/TimeFrameSelector";
import {Button} from "@/components/ui/button";
import {MoodName} from "@/types/enums/moodName";
import {TimeRange} from "@/types/enums/timeRange";
import {useTopTracks} from "@/hooks/useTopTracks";
import {TrackCard} from "@/components/ui/MusicGrid/TrackCard";

export default function DashboardPage() {
    const [mood, setMood] = useState<MoodName>(MoodName.HAPPY);
    const [timeframe, setTimeframe] =
        useState<TimeRange>(TimeRange.SHORT_TERM);

    const { tracks, loading, error } = useTopTracks(timeframe);

    return (
        <main className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8">
            <header className="space-y-3">
                <p className="text-sm font-medium text-primary">
                    YOUR PERSONAL SOUNDTRACK
                </p>

                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                    Music for your mood.
                </h1>

                <p className="max-w-xl text-muted">
                    Explore the artists and tracks that define your
                    listening habits.
                </p>
            </header>

            <section className="space-y-8">
                <MoodSelector
                    value={mood}
                    onChange={setMood}
                />

                <TimeframeSelector
                    value={timeframe}
                    onChange={setTimeframe}
                />

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <p className="text-sm text-muted">
                        Exploring {mood} music · {timeframe.replace("_", " ")}
                    </p>

                    <Button onClick={() => {
                        // Next: fetch or filter the selected music.
                    }}>
                        Explore my music
                    </Button>
                </div>
            </section>
            <section className="space-y-8">
                {loading && <p>Finding your soundtrack...</p>}

                {error && <p role="alert">{error}</p>}

                {!loading && !error && !tracks.map((track, index) => (
                    <TrackCard
                        track={track}
                        key={track.id}
                        rank={index + 1}
                    />
                ))}
            </section>
        </main>
    );
}