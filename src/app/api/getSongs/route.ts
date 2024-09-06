import {NextRequest} from "next/server";
import {ArtistDetailed} from "ytmusic-api";
import {youtubeMusic} from "~/YTMusic";

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get("artistID");
    let searchResults: ArtistDetailed[] = []
    if (searchQuery) {
        searchResults = await youtubeMusic.searchArtists(searchQuery);
    }
    return Response.json(searchResults);
}