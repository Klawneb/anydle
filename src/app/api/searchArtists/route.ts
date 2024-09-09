import {searchArtists} from "~/deezerAPI";
import {type NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get("searchQuery");
    if (!searchQuery) {
        return Response.json([]);
    }
    const artists = await searchArtists(searchQuery);
    return Response.json(artists);
}