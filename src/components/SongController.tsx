import useSound from "use-sound";
import {Button} from "@nextui-org/button";
import {Progress} from "@nextui-org/progress";
import {useState} from "react";
import {useStopwatch, useTimer} from "react-use-precision-timer";

interface SongControllerProps {
    songSrc: string
}

const time = new Date();

export function SongController({songSrc}: SongControllerProps) {
    const [timerProgress, setTimerProgress] = useState<number>(0);
    const [timerLength, setTimerLength] = useState(1000);
    const [timerIncrease, setTimerIncrease] = useState<number>(1000);
    const [play, {stop}] = useSound(songSrc, {
        volume: 0.2
    })
    const stopwatch = useStopwatch();
    const renderTimer = useTimer({delay: 10, }, () => {
        if (stopwatch.isRunning()){
            setTimerProgress(stopwatch.getElapsedRunningTime())
            if (stopwatch.getElapsedRunningTime() > timerLength) {
                stop()
                stopwatch.stop()
            }
        }
    })

    const markers = [6.25,12.5,25,43.75,68.75];
    
    

    return <div className={"w-full flex flex-col"}>
        <div className="relative w-full">
            <Progress label={`Current Time: ${timerLength/1000}s`} maxValue={16000} value={timerProgress} disableAnimation={true}/>
            {markers.map((marker, index) => (
                <div
                    key={index}
                    className="absolute h-3 w-0.5 top-8 bg-content4"
                    style={{
                        left: `${marker}%`,
                        transform: "translateX(-50%)",
                    }}
                ></div>
            ))}
        </div>
        <div className={"flex w-full justify-around my-2"}>
            <Button onPress={() => {
                stop()
                play()
                renderTimer.start();
                stopwatch.start();
            }}>Play</Button>
            <Button onPress={() =>  {
                if (timerLength >= 16000) {
                    return
                }
                setTimerLength(prev => prev + timerIncrease);
                setTimerIncrease(prev => prev + 1000);
            }}>Skip (+{timerIncrease/1000}s)</Button>
        </div>
    </div>
}