import {searchSongs} from "~/deezerAPI";
import {type NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get("searchQuery");
    const artist = req.nextUrl.searchParams.get("artist")
    if (!search) {
        return Response.json([]);
    }
    const songs = await searchSongs({search, artist});
    return Response.json(songs);
}