import Meyda from 'meyda';
import React, { useEffect, useRef } from 'react'

let audioContext: AudioContext;
let source: MediaStreamAudioSourceNode;

const setSource = async () => {
    const newMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    })

    await (source = audioContext.createMediaStreamSource(newMediaStream))
};

export const ExtractMFCC = (props: { audioRunning: boolean; }) => {

    // let mfcc_arr: number[][] = [];
    let mfcc_num_arr : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let count : number = 0;

    useEffect(() => {
        audioContext = new window.AudioContext();
        setSource().then(() => {
            // create a Meyda analyzer
            const analyzer = Meyda.createMeydaAnalyzer({
                audioContext: audioContext,
                source: source,
                bufferSize: 512,
                featureExtractors: ['mfcc'],
                callback: (features: { mfcc: number[]; }) => {
                    for(let i = 0; i < features.mfcc.length; i++){
                        mfcc_num_arr[i] += features.mfcc[i];
                    }
                    count += 1;
                    if (count >= 20){
                        let mfcc_arr : string[] = Array.from(features.mfcc).map((x: number) => ((x/20).toString()).substring(0, 5));
                        count = 0;
                        document.getElementsByClassName('mfcc')[0].innerHTML = mfcc_arr.toString();
                        mfcc_num_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    }
                    console.log(features.mfcc);
                }
            });
            analyzer.start();
        });
    }, [props.audioRunning]);

    // mfcc_arr = mfcc_arr.slice(0, 10);
    // console.log(46, mfcc_arr);

    // return mfcc_arr;

    return (
        <div>Extracted MFCCs: <br />
            <div className='mfcc'>
            </div>
            <ul>
            </ul>
        </div>
    )
}
