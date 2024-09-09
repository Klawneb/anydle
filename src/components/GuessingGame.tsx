import type {Artist, Song, SongResponse} from "~/types";
import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import {SongController} from "~/components/SongController";
import GuessInput from "~/components/GuessInput";
import {RiCloseLargeLine} from "react-icons/ri";
import {filterSongs} from "~/deezerAPI";

interface GuessingGameProps {
    artist: Artist
}

export function GuessingGame({artist}: GuessingGameProps) {
    const [songList, setSongList] = useState<Song[]>([]);
    const [isFetchingSongs, setIsFetchingSongs] = useState<boolean>(false);
    const [guessNumber, setGuessNumber] = useState(0);
    const [guessList, setGuessList] = useState<Array<string | null>>([null, null, null, null, null]);


    useEffect(() => {
        async function fetchSongs() {
            setIsFetchingSongs(true);
            const res = await fetch(`/api/getSongs?artistID=${artist.id}`);
            const songs = (await res.json()) as SongResponse;
            setSongList(filterSongs(songs.data));
            setIsFetchingSongs(false);
        }
        resetGame()
        void fetchSongs();
    }, [artist.id])
    
    function resetGame() {
        setGuessNumber(0);
        setGuessList([null, null, null, null, null]);
    }

    function makeGuess(song: Song | null) {
        if (guessNumber === 5) {
            return
        }
        if (song === null) {
            setGuessList(prev => {
                const newGuessList = [...prev];
                newGuessList[guessNumber] = `Skipped!`
                return newGuessList
            })
        } else {
            setGuessList(prev => {
                const newGuessList = [...prev];
                newGuessList[guessNumber] = `${song?.title} - ${song?.artist.name}`
                return newGuessList
            })
        }
        setGuessNumber(prev => prev + 1);
    }

    return <div
        className={"w-full flex flex-grow flex-col justify-center items-center my-4 text-large text-default-500"}>
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
                <div className={"flex flex-col w-full h-full"}>
                    <div className={"text-default-200"}>
                        {
                            guessList.map((guess, index) => {
                                return <div key={index}
                                            className={"flex pl-4 items-center w-full rounded-xl bg-content2 h-12 my-4"}>
                                    {
                                        guess === null ? 
                                            <p>{index + 1}.</p> 
                                            :
                                            <div className={"flex items-center"}>
                                                <RiCloseLargeLine className="mr-2 w-6 h-6 fill-danger"/>
                                                <p className={"text-danger"}>{guess}</p>
                                            </div>
                                    }
                                </div>
                            })
                        }
                    </div>
                    <div className={"mt-auto"}>
                        <SongController songSrc={songList[0]!.preview} guessNumber={guessNumber}/>
                        <GuessInput guessNumber={guessNumber} makeGuess={makeGuess}/>
                    </div>
                </div>
                : null
        }
    </div>
}