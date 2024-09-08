import {Artist, Song, TopSongsResponse} from "~/types";
import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import {SongController} from "~/components/SongController";

interface GuessignGameProps {
    artist: Artist
}

export function GuessingGame({ artist }: GuessignGameProps) {
    const [songList, setSongList] = useState<Song[]>([])
    const [isFetchingSongs, setIsFetchingSongs] = useState<boolean>(false);
    
    useEffect(() => {
        async function fetchSongs() {
            setIsFetchingSongs(true);
            const res = await fetch(`/api/getSongs?artistID=${artist.id}`);
            const songs = (await res.json()) as TopSongsResponse;
            setSongList(songs.data);
            setIsFetchingSongs(false);
        }
        
        void fetchSongs();
    }, [artist.id])
    
    return <div className={"w-full flex flex-col justify-center items-center my-4 text-large text-default-500"}>
        {
            isFetchingSongs ?
                <div className={"flex"}>
                    <Spinner size="sm"/>
                    <p className={"ml-2 "}>Fetching songs...</p>
                </div>
                :
                <p>Found {songList.length} songs!</p>
        }
        {
            songList.length > 0 ?
                <SongController songSrc={songList[0]!.preview}/>
                : null
        }
    </div>
}