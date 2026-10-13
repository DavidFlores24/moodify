import type { Mood } from '@/types/Mood'
import {MoodName} from "@/types/enums/moodName";

export interface MoodScore {
    happy: number;
    melancholic: number;
    energetic: number;
    relaxed: number;
    focused: number;
}

export interface ClassifiableTrack {
    id: string;
    name: string;
    artists: string[];
    moodScores?: Partial<MoodScore>;
}

export function rankTracksByMood<T extends ClassifiableTrack>(tracks: T[], mood: MoodName): T[] {
    return tracks.map((track, index) => ({
        track,
        index,
        score: track.moodScores?.[mood] ?? 0
    }))
        .sort((a,b) => b.score - a.score || a.index - b.index)
        .map(({track}) => track)
}