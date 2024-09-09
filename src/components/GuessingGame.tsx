import type {Artist, Song, SongResponse} from "~/types";
import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import {SongController} from "~/components/SongController";
import GuessInput from "~/components/GuessInput";
import {RiCloseLargeLine} from "react-icons/ri";
import {filterSongs} from "~/deezerAPI";
import Image from "next/image";
import {Button} from "@nextui-org/button";

interface GuessingGameProps {
    artist: Artist
}

export function GuessingGame({artist}: GuessingGameProps) {
    const [songList, setSongList] = useState<Song[]>([]);
    const [isFetchingSongs, setIsFetchingSongs] = useState<boolean>(false);
    const [guessNumber, setGuessNumber] = useState(0);
    const [guessList, setGuessList] = useState<Array<string | null>>([null, null, null, null, null]);
    const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
    const [gameWon, setGameWon] = useState(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    
    useEffect(() => {
        async function fetchSongs() {
            setIsFetchingSongs(true);
            const res = await fetch(`/api/getSongs?artistID=${artist.id}`);
            const songs = (await res.json()) as SongResponse;
            
            setSongList(filterSongs(songs.data));
            setIsFetchingSongs(false);
            console.log(songList)
        }
        
        resetGame()
        void fetchSongs();
    }, [artist.id, songList.length]);
    
    function resetGame() {
        setGuessNumber(0);
        setGuessList([null, null, null, null, null]);
        setGameOver(false);
        setGameWon(false);
        if (songList.length > 0) {
            setSelectedSong(songList[Math.floor(Math.random() * songList.length)])
        }
    }

    function makeGuess(guess: Song | null) {
        if (guess?.id === selectedSong?.id) {
            setGameWon(true);
            setGameOver(true);
        }
        if (guessNumber === 5) {
            setGameOver(true);
        }
        if (guess === null) {
            setGuessList(prev => {
                const newGuessList = [...prev];
                newGuessList[guessNumber] = `Skipped!`
                return newGuessList
            })
        } else {
            setGuessList(prev => {
                const newGuessList = [...prev];
                newGuessList[guessNumber] = `${guess?.title} - ${guess?.artist.name}`
                return newGuessList
            })
        }
        setGuessNumber(prev => prev + 1);
    }
    
    if (gameOver && selectedSong) {
        return <div className={"flex flex-col bg-content2 rounded-xl my-10 items-center"}>
            {
                gameWon ?
                    <p className={"text-center text-xl font-bold text-success pt-4"}>Well done!</p>
                    :
                    <p className={"text-center text-xl font-bold text-danger pt-4"}>Better luck next time!</p>
            }
            <div className={"flex px-4 w-full"}>
                <Image className={"my-auto rounded-lg"} src={selectedSong.album.cover} alt={selectedSong.title_short + " cover"} width={140} height={140}/>
                <div className={"flex flex-col p-4 mr-auto"}>
                    <p className={"py-2 font-bold text-2xl"}>{selectedSong.title}</p>
                    <p className={"py-2 text-large"}>{selectedSong.album.title}</p>
                    <p className={"py-2"}>{selectedSong.artist.name}</p>
                </div>
            </div>
            <Button onPress={resetGame} className={"my-2"} color={"primary"}>Play again</Button>
        </div>
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
            selectedSong ?
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
                        <SongController songSrc={selectedSong.preview} guessNumber={guessNumber}/>
                        <GuessInput guessNumber={guessNumber} makeGuess={makeGuess}/>
                    </div>
                </div>
                : null
        }
    </div>
}