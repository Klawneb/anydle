import {Autocomplete, AutocompleteItem} from "@nextui-org/autocomplete";
import {type Artist, type Song, type SongResponse} from "~/types";
import {useState} from "react";
import {Button} from "@nextui-org/button";
import {timerProgressAtom} from "~/components/SongController";
import {useAtom} from "jotai";
import {filterSongs} from "~/deezerAPI";

interface GuessInputProps {
    guessNumber: number,
    makeGuess: (song: Song | null) => void
    artist: Artist
}

export default function GuessInput({guessNumber, makeGuess, artist}: GuessInputProps) {
    const [songSearchResults, setSongSearchResults] = useState<Song[]>([]);
    const [, setTimerProgress] = useAtom(timerProgressAtom);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    async function handleSearch(query: string) {
        const res = await fetch(`/api/searchSongs?artist=${encodeURIComponent(artist.name)}&searchQuery=${encodeURIComponent(query)}`);
        const results = (await res.json()) as SongResponse;
        setSongSearchResults(results.data ?? []);
    }

    function handleSelectionChange(key: React.Key | null) {
        const selected = songSearchResults.find((song) => song.id == key);
        setSelectedSong(selected ? selected : null);
    }

    function onSkip() {
        makeGuess(null);
        setTimerProgress(0);
    }

    function onSubmit() {
        if (selectedSong) {
            makeGuess(selectedSong)
            setTimerProgress(0);
        }
    }

    return <div className={"w-full"}>
        <Autocomplete
            label={"Song search"}
            onInputChange={handleSearch}
            onSelectionChange={handleSelectionChange}
        >
            {
                filterSongs(songSearchResults)
                    .map((song: Song) => {
                        return (
                            <AutocompleteItem
                                key={song.id}
                                textValue={song.title + " " + song.artist.name}
                            >
                                <div className={"flex w-full"}>
                                    <p className={"truncate"}>{song.title}</p>
                                    <p className={"text-divider"}> - {song.artist.name}</p>
                                </div>
                            </AutocompleteItem>
                        );
                    })
            }
        </Autocomplete>
        <div className={"flex justify-between my-2 px-2"}>
            <Button onPress={onSkip} color={"danger"}>Skip (+{guessNumber + 1}s)</Button>
            <Button onPress={onSubmit} color={"success"}>Submit</Button>
        </div>
    </div>
}