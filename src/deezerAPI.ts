import {type ArtistSearchResponse, type Song, type SongResponse} from "~/types";

const uri = "https://api.deezer.com"

type SearchQuery = {
    search: string
    artist: string | null
}

export async function searchArtists(searchQuery: string): Promise<ArtistSearchResponse> {
    const res = await fetch(`${uri}/search/artist?q=${searchQuery}`);
    return (await res.json()) as ArtistSearchResponse;
}

export async function getSongs(artistID: string) {
    const res = await fetch(`${uri}/artist/${artistID}/top/&limit=100`);
    return (await res.json()) as SongResponse;
}

export async function searchSongs(query: SearchQuery): Promise<SongResponse> {
    let search = encodeURIComponent(query.search);
    if (query.artist) search = `artist:"${encodeURIComponent(query.artist)}" ${search}`;

    const res = await fetch(`${uri}/search?q=${search}&order=RANKING`);
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