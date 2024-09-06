import {Typewriter, useTypewriter} from "react-simple-typewriter";
import {bandList} from "~/data/bandList";

interface TitleProps {
    selectedArtist?: string
}
export function Title({ selectedArtist }: TitleProps) {
    const [bandTypewriter] = useTypewriter({
        words: selectedArtist ? [selectedArtist] : bandList,
    })
    
    console.log(selectedArtist);

    return <div className={"flex w-screen justify-center text-9xl font-black truncate "}>
        <div className={"bg-gradient-to-br from-cyan-100 to-blue-600 bg-clip-text text-transparent"}>
            {
                selectedArtist ?
                    <Typewriter  words={[selectedArtist]} loop={1}/>
                    :
                    <p>{bandTypewriter}</p>
            }
        </div>
        <p className={"ml-4"}>dle</p>
    </div>
}