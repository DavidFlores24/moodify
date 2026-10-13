import {TimeRange} from '@/types/enums/timeRange'

export type TimeFrame = {
    value: TimeRange,
    label: string
}

export const TIMEFRAMES: TimeFrame[] = [
    {
        value: TimeRange.SHORT_TERM,
        label: "Last 4 weeks"
    },
    {
        value: TimeRange.MEDIUM_TERM,
        label: "Last 6 months"
    },
    {
        value: TimeRange.LONG_TERM,
        label: "Last 12 months"
    }
]