import useSound from "use-sound";
import {Button} from "@nextui-org/button";
import {Progress} from "@nextui-org/progress";
import {useEffect} from "react";
import {useStopwatch, useTimer} from "react-use-precision-timer";
import {FaPlay} from "react-icons/fa";
import {useAtom, atom} from "jotai";

export const timerProgressAtom = atom<number>(0)

interface SongControllerProps {
    songSrc: string,
    guessNumber: number,
}

function getGuessTime(guessNum: number) {
    if (guessNum === 0) {
        return 1;
    }
    return ((guessNum*guessNum) + guessNum + 2) / 2
}

export function SongController({songSrc, guessNumber}: SongControllerProps) {
    const [timerProgress, setTimerProgress] = useAtom<number>(timerProgressAtom);
    const [play, {stop}] = useSound(songSrc, {
        volume: 0.2
    }, )
    const stopwatch = useStopwatch();
    const renderTimer = useTimer({delay: 10}, () => {
        if (stopwatch.isRunning()){
            setTimerProgress(stopwatch.getElapsedRunningTime())
            if (stopwatch.getElapsedRunningTime() > getGuessTime(guessNumber)*1000) {
                stop()
                stopwatch.stop()
            }
        }
    })

    useEffect(() => {
        return () => {
            stop();
        }
    }, [stop]);

    const markers = [6.25,12.5,25,43.75,68.75];

    return <div className={"w-full flex flex-col my-4 "}>
        <div className="relative w-full">
            <Progress classNames={{
                indicator: "rounded-none"
            }} 
                      maxValue={16000} 
                      value={timerProgress} 
                      disableAnimation={true}
                      aria-label={"Progress"}
            />
            {markers.map((marker, index) => (
                <div
                    key={index}
                    className="absolute h-3 w-0.5 bg-content4 -top-[0px]"
                    style={{
                        left: `${marker}%`,
                        transform: "translateX(-50%)",
                    }}
                />
            ))}
        </div>
        <div className={"flex w-full justify-between items-center my-2"}>
            <p className={"w-10"}>0:{timerProgress < 9500 ? "0" : ""}{(timerProgress / 1000).toFixed(0)}</p>
            <Button
                color={"primary"}
                endContent={<FaPlay/>}
                onPress={() => {
                    stop();
                    play();
                    renderTimer.start();
                    stopwatch.start();
                }}>Play</Button>
            <p className={"w-10"}>0:16</p>
        </div>
    </div>
}