import { createSignal, type Component, Show, Switch, Match } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { BreathCircle } from "./BreathCircle";

function pad2(number) {
  return (number < 10 ? '0' : '') + number
}

//background audio
var actx = new (AudioContext || webkitAudioContext)(),
  src = 'audio/water.mp3',
  audioData, srcNode;

fetch(src, {mode: "cors"}).then(function(resp) {return resp.arrayBuffer()}).then(decode);
// Decode the audio file, then start the show
function decode(buffer) {
  actx.decodeAudioData(buffer, playLoop);
}

// Sets up a new source node as needed as stopping will render current invalid
function playLoop(abuffer) {
  if (!audioData) audioData = abuffer;  // create a reference for control buttons
  srcNode = actx.createBufferSource();  // create audio source
  srcNode.buffer = abuffer;             // use decoded buffer
  srcNode.connect(actx.destination);    // create output
  srcNode.loop = true;                  // takes care of perfect looping
  srcNode.start();                      // play...
}

const App: Component = () =>
{
  
  const [percent, setPercent] = createSignal(0);
  const [state, setState] = createSignal(0);
  const [inhale, setInhale] = createSignal(4);
  const [exhale, setExhale] = createSignal(6);
  const [count, setCount] = createSignal(4);
  const [text, setText] = createSignal("");
  const [show, setShow] = createSignal(0);
  const [backaudio, setBackaudio] = createSignal();

  const [timeStart, setTimeStart] = createSignal(0);
  const [duration, setDuration] = createSignal(5); // in minutes
  const [time, setTime] = createSignal("");

  const updateCircle = () =>
  {
    let distance = timeStart() - Date.now();
    setTime(pad2(parseInt((distance % (1000 * 60 * 60)) / (1000 * 60)))+":"+pad2(parseInt((distance % (1000 * 60)) / 1000)))
    if(1000 > distance)
    {
      setShow(0)
    }

    if(0 == state())
    {
      if(0 == percent())
      {
        setCount(inhale()+1)
        backaudio().src = "audio/inhale.mp3"
        backaudio().play()
        setText("Inhale")
      }

      setPercent(percent() + 100/inhale())
    }
    else if(1 == state())
    {
      if(100 == percent())
      {
        setCount(exhale()+1)
        backaudio().src = "audio/exhale.mp3"
        backaudio().play()
        setText("Exhale")
      }

      setPercent(percent() - 100/exhale())
    }

    if(99 < percent())
    {
      setState(1)
      setPercent(100)
    }
    else if(1 > percent())
    {
      setState(0)
      setPercent(0)
    }

    if(1 == show())
    {
      setCount(count()-1)
      setTimeout(updateCircle, 1000)
    }
    else
    {
      setState(0)
      setPercent(0)
    }
  }

  const startCircle = () =>
  {
    setShow(1)
    setBackaudio(new Audio('audio/inhale.mp3'))
    if (actx.state === 'suspended')
    {
      actx.resume()
    }
    else
    {
      playLoop(audioData)
    }
    setTimeout(updateCircle, 50)
    setTimeStart(Date.now()+duration()*60*1000)
  };

  const stopCircle = () =>
  {
    setShow(0)
    actx.suspend()
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
      <Switch fallback={<div>Not Found</div>}>
        <Match when={0 == show()}>
          <button class="btn btn-blue" onClick={() => setShow(2)}>Start</button>
        </Match>
        <Match when={1 == show()}>
          <BreathCircle percent={percent()} text={text()} count={count()}/>
          <button class="btn btn-blue" onClick={stopCircle}>Stop</button>
          <span class="absolute bottom-0 right-16 sm:right-1 text-xs">{time()}</span>
        </Match>
        <Match when={2 == show()}>
          <button class="btn btn-blue" onClick={() => {setDuration(10);startCircle()}}>10 min</button>
          <button class="btn btn-blue mt-3 !px-6" onClick={() => {setDuration(5);startCircle()}}>5 min</button>
          <button class="btn btn-blue mt-3 !px-6" onClick={() => {setDuration(1);startCircle()}}>1 min</button>
        </Match>
      </Switch>
      </header>
    </div>
  );
};

export default App;
