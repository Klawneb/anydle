import {getSongs } from "~/deezerAPI";
import {type NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const artistID = req.nextUrl.searchParams.get("artistID");
    if (!artistID) {
        return Response.json([]);
    }
    const songs = await getSongs(artistID);
    return Response.json(songs);
}