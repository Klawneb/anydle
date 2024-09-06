import {useEffect, useState} from "react";
import {ArtistFull} from "ytmusic-api";
import Image from "next/image";

interface ArtistInfoPanelProps {
    artistID: string
}

export default function ArtistInfoPanel({ artistID }: ArtistInfoPanelProps) {
    const [artistInfo, setArtistInfo] = useState<ArtistFull | null>(null);
    
    const thumbnail = artistInfo?.thumbnails[0]
    
    useEffect(() => {
        void getArtistInfo(artistID)
    }, [artistID])
    
    async function getArtistInfo(artistID: string | null) {
        const res = await fetch("/api/getArtist?artistID=" + artistID);
        setArtistInfo((await res.json()) as ArtistFull | null);
    }
    
    if (!artistInfo) return null;
    
    return <div className={"flex my-4"}>
        <div className={"w-28 h-28 relative"}>
            <Image className={"rounded-lg"} src={thumbnail?.url ?? ""} alt={`${artistInfo.name} Image`} width={100} height={100}/>
        </div>
        <div className={"ml-4"}>
            <h1 className={"text-4xl font-bold"}>{artistInfo.name}</h1>
        </div>
    </div>
}