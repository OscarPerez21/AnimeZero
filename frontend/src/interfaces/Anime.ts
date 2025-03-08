export interface Anime{
    id_anime: number;
    title: string;
    chapters: number | null;
    poster: string | null;
}

export interface AnimeChapter {
    id_anime_chapters: number;
    video_url: string;
}

export interface AnimeData {
    title: string;
    description: string | null;
    chapters: number | null;
    poster: string | null;
    anime_chapters: AnimeChapter[];
}

export interface AnimeName{
    title: string[];
}