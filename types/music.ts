export interface Track {
    id: string;
    name: string;
    artists: {
        id: string;
        name: string;
    }[];
    album: {
        name: string;
        images: {
            url: string;
            width: number | null;
            height: number | null;
        }[];
    };
    external_urls?: {
        spotify: string;
    };
}