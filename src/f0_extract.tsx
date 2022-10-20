import Meyda from 'meyda';
// import yinjs from 'yinjs';
import React, { useEffect, useRef } from 'react'
// import { sampleRate } from 'meyda';

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
        const sampleRate : number = 16000;
        audioContext = new window.AudioContext({
            sampleRate: sampleRate
        });
        let analyserOptions : AnalyserOptions = { // visual largely affected by fftSize and minDecibels. Roughly direct relationship 
            "fftSize": 512, // fftSize / 2 is the length of the dataArray. Less: Data are Crunched: Large: the Opposite
            "maxDecibels": -30,
            "minDecibels": -70, // lowest volume to pick up
            "smoothingTimeConstant": 0.8, // lower: less smooth
        };
        let analyser : AnalyserNode = new AnalyserNode(audioContext, analyserOptions);;
        let dataArray = new Uint8Array(analyser.frequencyBinCount); // data for visualization

        setSource().then(() => {
            source.connect(analyser);
        })
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
