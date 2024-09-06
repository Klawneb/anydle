import YTMusic, {ArtistDetailed, ArtistFull} from "ytmusic-api"
import {NextRequest} from "next/server";
import {youtubeMusic} from "~/YTMusic";

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get("searchQuery");
    let searchResults: ArtistDetailed[] = []
    if (searchQuery) {
        searchResults = await youtubeMusic.searchArtists(searchQuery);
    }
    return Response.json(searchResults);
}