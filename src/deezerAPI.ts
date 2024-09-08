import {Artist, ArtistSearchResponse, Song, TopSongsResponse} from "~/types";

const uri = "https://api.deezer.com"

export async function searchArtists(searchQuery: string): Promise<ArtistSearchResponse> {
    const res = await fetch(`${uri}/search/artist?q=${searchQuery}`);
    return (await res.json()) as ArtistSearchResponse;
}

export async function getSongs(artistID: string) {
    const res = await fetch(`${uri}/artist/${artistID}/top/&limit=100`);
    return (await res.json()) as TopSongsResponse;
}