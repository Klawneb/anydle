import {type ArtistSearchResponse, type Song, type SongResponse} from "~/types";

const uri = "https://api.deezer.com"

export async function searchArtists(searchQuery: string): Promise<ArtistSearchResponse> {
    const res = await fetch(`${uri}/search/artist?q=${searchQuery}`);
    return (await res.json()) as ArtistSearchResponse;
}

export async function getSongs(artistID: string) {
    const res = await fetch(`${uri}/artist/${artistID}/top/&limit=100`);
    return (await res.json()) as SongResponse;
}

export async function searchSongs(searchQuery: string): Promise<SongResponse> {
    const res = await fetch(`${uri}/search?q=${searchQuery}&order=RANKING`);
    return (await res.json()) as SongResponse;
}

export function filterSongs(songs: Song[]) {
    const seenSongs = new Set<string>()
    return songs.filter((song) => {
        if (seenSongs.has(`${song.title_short} ${song.artist.name}`)) {
            return false
        }
        seenSongs.add(`${song.title_short} ${song.artist.name}`);
        return true;
    })
}