"use client"
import {useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/autocomplete";
import Image from "next/image";
import {type Artist, type ArtistSearchResponse} from "~/types";
import {Title} from "~/components/Title";
import {GuessingGame} from "~/components/GuessingGame";

export default function HomePage() {
    const [searchResults, setSearchResults] = useState<Artist[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

    async function handleSearch(query: string) {
        const res = await fetch("/api/searchArtists?searchQuery=" + query);
        const results = (await res.json()) as ArtistSearchResponse;
        setSearchResults(results.data ?? [])
    }

    function handleSelection(key: React.Key | null) {
        const selected = searchResults.find((artist) => artist.id.toString() === key);
        setSelectedArtist(selected ? selected : null);
    }


    return (
        <div className={"w-screen h-screen flex flex-col items-center justify-center"}>
            <Title selectedArtist={selectedArtist?.name}/>
            <div className={"w-[500px] h-full mt-8 flex flex-col"}>
                <Autocomplete
                    label="Artist Search"
                    onInputChange={handleSearch}
                    onSelectionChange={handleSelection}
                    size={"lg"}
                >
                    {
                        searchResults.map((artist) => {
                            return <AutocompleteItem key={artist.id} textValue={artist.name}>
                                <div className={"flex items-center"}>
                                    <Image className={"rounded-md"} src={artist.picture_medium}
                                           alt={`${artist.name} thumbnail`} width={50} height={50}/>
                                    <p className={"ml-4 text-2xl"}>{artist.name}</p>
                                </div>
                            </AutocompleteItem>
                        })
                    }
                </Autocomplete>
                {selectedArtist && <GuessingGame artist={selectedArtist}/>}
            </div>
        </div>
    );
}
