import {MoodName} from "@/types/enums/moodName"

export type Mood = {
    value: MoodName,
    label: string,
    description: string
}

export const MOODS: Mood[] = [
    {
        value: MoodName.HAPPY,
        label: 'Happy',
        description: "Bright, uplifting favourites"
    },
    {
        value: MoodName.MELANCHOLIC,
        label: "Melancholic",
        description: "Reflective, emotional tracks"
    },
    {
        value: MoodName.ENERGETIC,
        label: "Energetic",
        description: "Music for movement"
    },
    {
        value: MoodName.RELAXED,
        label: "Relaxed",
        description: "Gentle, laid back listening"
    },
    {
        value: MoodName.FOCUSED,
        label: "Focused",
        description: "Music for getting in the flow"
    }
]