import {Autocomplete, AutocompleteItem} from "@nextui-org/autocomplete";
import {ArtistSearchResponse, Song, SongResponse} from "~/types";
import {Dispatch, SetStateAction, useState} from "react";
import {Button} from "@nextui-org/button";

interface GuessInputProps {
    guessNumber: number,
    setGuessNumber: Dispatch<SetStateAction<number>>
}

export default function GuessInput({ guessNumber,setGuessNumber }: GuessInputProps) {
    const [songSearchResults, setSongSearchResults] = useState<Song[]>([]);
    async function handleSearch(query: string) {
        const res = await fetch("/api/searchSongs?searchQuery=" + query);
        const results = (await res.json()) as SongResponse;
        setSongSearchResults(results.data ?? []);
    }

    function onSkip() {
        setGuessNumber(prev => prev + 1);
    }

    return <div className={"w-full"}>
        <Autocomplete
            label={"Song search"}
            onInputChange={handleSearch}
        >
            {
                songSearchResults
                    .map((song: Song) => {
                    return (
                      <AutocompleteItem
                        key={song.id}
                        textValue={song.title + " " + song.artist.name}
                      >
                        <div className={"flex w-full"}>
                            <p className={"truncate"}>{song.title}</p>
                            <p className={"text-divider"}>- {song.artist.name}</p>
                        </div>
                      </AutocompleteItem>
                    );
                    })
            }
        </Autocomplete>
        <div className={"flex justify-between my-2 px-2"}>
            <Button onPress={onSkip} color={"danger"}>Skip (+{guessNumber+1}s)</Button>
            <Button color={"success"}>Submit</Button>
        </div>
    </div>
}