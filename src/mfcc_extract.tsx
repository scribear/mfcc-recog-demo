import Meyda from 'meyda';
import { useEffect, useRef } from 'react'

const setSource = async (audioContext: AudioContext) => {
    const newMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    });

    return audioContext.createMediaStreamSource(newMediaStream);
};

export const ExtractMFCC = (props: { audioRunning: boolean; }) => {
    const mfccRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let count = 0;

        setSource(new window.AudioContext()).then(source => {
            // create a Meyda analyzer
            const analyzer = Meyda.createMeydaAnalyzer({
                audioContext: source.context,
                source: source,
                bufferSize: 512,
                featureExtractors: ['mfcc'],
                callback: (features: { mfcc: number[]; }) => {
                    if (++count >= 60) {
                        mfccRef.current!.innerHTML = features.mfcc.map(n => n.toPrecision(4)).join(", ");
                        count = 0;
                    }
                }
            });
            analyzer.start();
        });
    }, [props.audioRunning]);

    return (<div ref={mfccRef}></div>)
}
