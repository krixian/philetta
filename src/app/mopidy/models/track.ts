import { Artist } from "./artist";
import { Album } from "./album";

export interface Track {
    uri: string;
    name: string;
    artists: Artist[];
    album: Album;
    composers: Artist[];
    performers: Artist[];
    genre: string;
    track_no: number;
    disc_no: number;
    date: string;
    length: number;
    bitrate: number;
    comment: string;
    musicbrainz_id: string;
    last_modified: number;
}
