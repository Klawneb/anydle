import {getSongs } from "~/deezerAPI";
import {NextRequest} from "next/server";
import {Song} from "~/types";

export async function GET(req: NextRequest) {
    const artistID = req.nextUrl.searchParams.get("artistID");
    if (!artistID) {
        return Response.json([]);
    }
    const songs = await getSongs(artistID);
    return Response.json(songs);
}

function filterSongs(songs: Song[]) {
    
}