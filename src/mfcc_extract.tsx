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
    let mfcc_num_arr = new Array(13).fill(0);
    let count = 0;
    const mfccRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSource(new window.AudioContext()).then(source => {
            // create a Meyda analyzer
            const analyzer = Meyda.createMeydaAnalyzer({
                audioContext: source.context,
                source: source,
                bufferSize: 512,
                featureExtractors: ['mfcc'],
                callback: (features: { mfcc: number[]; }) => {
                    for(let i = 0; i < features.mfcc.length; i++){
                        mfcc_num_arr[i] += features.mfcc[i];
                    }
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
