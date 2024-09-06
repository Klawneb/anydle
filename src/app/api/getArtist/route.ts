import {ArtistDetailed, ArtistFull} from "ytmusic-api"
import {NextRequest} from "next/server";
import {youtubeMusic} from "~/YTMusic";

export async function GET(req: NextRequest) {
    const artistID = req.nextUrl.searchParams.get("artistID");
    let artistInfo: ArtistFull | null = null
    if (artistID) {
        artistInfo = await youtubeMusic.getArtist(artistID);
    }
    return Response.json(artistInfo);
}