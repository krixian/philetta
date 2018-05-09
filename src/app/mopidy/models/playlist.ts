import { Track } from "./track";

export interface Playlist {
    uri: string;
    name: string;
    tracks: Track[];
    last_modified: number;
}
