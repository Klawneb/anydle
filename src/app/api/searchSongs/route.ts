import { searchSongs} from "~/deezerAPI";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get("searchQuery");
    if (!searchQuery) {
        return Response.json([]);
    }
    const songs = await searchSongs(searchQuery);
    return Response.json(songs);
}