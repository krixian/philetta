import { Artist } from "./artist";

export interface Album {
    uri: string;
    name: string;
    artists: Artist[];
    num_tracks: number;
    num_discs: number;
    date: string;
    musicbrainz_id:string;
}
