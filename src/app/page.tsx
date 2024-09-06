"use client"
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Autocomplete, AutocompleteItem} from "@nextui-org/autocomplete";
import Image from "next/image";
import {Artist, ArtistSearchResponse} from "~/types";

export default function HomePage() {
    const [searchResults, setSearchResults] = useState<Artist[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

    async function handleSearch(query: string) {
        const res = await fetch("/api/searchArtists?searchQuery=" + query);
        const results = (await res.json()) as ArtistSearchResponse;
        setSearchResults(results.data ?? [])
    }

    function handleSelection(key: React.Key | null) {
        const selected = searchResults.find((artist) => artist.id === Number(key));
        setSelectedArtist(selected ? selected : null);
    }
    

    return (
        <div className={"w-screen h-screen flex items-center justify-center"}>
            <div className={"w-[500px] h-full"}>
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
                {
                    selectedArtist &&
                    <div>
                        <p>{selectedArtist.name}</p>
                    </div>
                }
            </div>
        </div>
    );
}
