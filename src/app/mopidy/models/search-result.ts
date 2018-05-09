import { Track } from "./track";
import { Artist } from "./artist";
import { Album } from "./album";

export interface SearchResult {
    uri: string;
    tracks: Track[];
    artists: Artist[];
    albums: Album[];
}
