import React from 'react';

import './App.css';
import { ExtractMFCC } from './mfcc_extract';

function App() {
  const [audioRunning, setAudioRunning] = React.useState<boolean>(false);

  window.onload = function() {
    var context = new AudioContext();
    console.log(10, `${(context.state === 'suspended')? 'AudioContext suspended, click start to create/resume' : 'state: '}`, context.state);

    // One-liner to resume playback when user interacted with the page.
    document.querySelector('button')!.addEventListener('click', function() {
      context.resume().then(() => {
        console.log(15, 'Playback resumed successfully, state: ' + context.state);
        if (context.state === 'running') {
          setAudioRunning(true);
        }
      });
    });
  }

  React.useEffect(()=>{
      console.log("in effect");
  }, [audioRunning]);

  return (
    <div className="App">
      <button>Start</button>
        {/* <ConverseDemo/> */}
        {/* <AzureRecog/> */}
        {/* <ul >
          hello
        </ul> */}
        <ExtractMFCC audioRunning = {audioRunning}/>
    </div>
  );
}

export default App;
