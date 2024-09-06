"use client"
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Autocomplete, AutocompleteItem} from "@nextui-org/autocomplete";
import {ArtistDetailed, ArtistFull} from "ytmusic-api";
import Image from "next/image";
import ArtistInfoPanel from "~/components/ArtistInfoPanel";

export default function HomePage() {
    const [searchResults, setSearchResults] = useState<ArtistDetailed[]>([]);
    const [selectedArtistID, setSelectedArtistID] = useState<string | null>(null);
    
    async function handleSearch(query: string){
        const res = await fetch("/api/searchArtists?searchQuery=" + query);
        setSearchResults((await res.json()) as ArtistDetailed[]);
    }
    
    function handleArtistSelection(key: React.Key | null) {
        setSelectedArtistID(key?.toString() ?? null);
    }

    return (
        <div className={"w-screen h-screen flex items-center justify-center"}>
            <div className={"w-[500px] h-full"}>
                <Autocomplete 
                    label="Artist Search"
                    onInputChange={handleSearch}
                    onSelectionChange={handleArtistSelection}
                >
                    {
                        searchResults.map((artist) => {
                            return <AutocompleteItem key={artist.artistId} textValue={artist.name}>
                                <div className={"flex items-center"}>
                                    <Image className={"rounded"} src={artist.thumbnails[0]?.url ?? ""} alt={artist.name} width={60} height={60}/>
                                    <p className={"text-2xl ml-4"}>{artist.name}</p>
                                </div>
                            </AutocompleteItem>
                        })
                    }
                </Autocomplete>
            </div>
        </div>
    );
}
