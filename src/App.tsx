import { createSignal, type Component, Show, Switch, Match } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { BreathCircle } from "./BreathCircle";

function pad2(number)
{
  return (number < 10 ? '0' : '') + number
}

const App: Component = () =>
{
  const [percent, setPercent] = createSignal(0);
  const [inhale, setInhale] = createSignal(4);
  const [exhale, setExhale] = createSignal(6);
  const [count, setCount] = createSignal(4);
  const [text, setText] = createSignal("");
  const [show, setShow] = createSignal(0);
  const [backaudio, setBackaudio] = createSignal(null);
  const [backgroundAudio1, setBackgroundAudio1] = createSignal(null);
  const [backgroundAudio2, setBackgroundAudio2] = createSignal(null);

  const [timeStart, setTimeStart] = createSignal(0);
  const [duration, setDuration] = createSignal(5); // in minutes
  const [time, setTime] = createSignal("");

  const [timeLoop, setTimeLoop] = createSignal(0);
  const [workSession, setWorkSession] = createSignal(false);

  const updateCircle = () =>
  {
    setTimeLoop((Math.round(backaudio().currentTime)% 10))

    let distance = timeStart() - backaudio().currentTime;
    setTime(pad2(parseInt((distance % (60 * 60)) / 60))+":"+pad2(parseInt((distance % 60))))
    if(backaudio().paused)
    {
      stopCircle()
      if(workSession())
      {
        setShow(3)
        backaudio().src = "audio/binaural_meditation_25min.mp3"
        backaudio().play()
        setDuration(25)
        setTimeStart(duration()*60)
        setTimeout(updateWorkSession, 500)
      }
    }

    if(timeLoop() < inhale() || timeLoop() == 10)
    {
      //console.log("i: "+timeLoop())
      if(0 == timeLoop() || timeLoop() == 10)
      {
        setText("Inhale")
        setCount(inhale()+1)
      }

      setPercent(percent() + 100/inhale())
      if(100 < percent())
      {
        setPercent(100)
      }
    }
    else if(timeLoop() >= inhale())
    {
      //console.log("e: "+timeLoop())
      if(inhale() == timeLoop())
      {
        setText("Exhale")
        setCount(exhale()+1)
      }

      setPercent(percent() - 100/exhale())
      if(1 > percent())
      {
        setPercent(0)
      }
    }

    if(1 == show())
    {
      setCount(count()-1)
      let delay = 1000 - (backaudio().currentTime - parseInt(backaudio().currentTime))*1000
      if(100 < delay)
      {
        setTimeout(updateCircle, (1000 - (backaudio().currentTime - parseInt(backaudio().currentTime))*1000))
      }
      else
      {
        setTimeout(updateCircle, 1000)
      }
    }
    else
    {
      setPercent(0)
    }
  }

  const startBackgroundAudio1 = () =>
  {
    if(1 == show())
    {
      backgroundAudio1().play()
      setTimeout(startBackgroundAudio2, 10000)
    }
  }
  const startBackgroundAudio2 = () =>
  {
    if(1 == show())
    {
      backgroundAudio2().play()
      setTimeout(startBackgroundAudio1, 10000)
    }
  }

  const startCircle = () =>
  {
    setShow(1)
    if(null == backaudio())
    {
      setBackaudio(new Audio("audio/4-6_"+duration()+"min.mp3"))
    }
    else
    {
      backaudio().src = "audio/4-6_"+duration()+"min.mp3"
    }
    backaudio().play()
    if(null == backgroundAudio1())
    {
      setBackgroundAudio1(new Audio('audio/water.mp3'))
      setBackgroundAudio2(new Audio('audio/water.mp3'))
    }
    startBackgroundAudio1()
    setTimeout(updateCircle, 500)
    setText("Inhale")
    setCount(inhale())
    setTimeStart(duration()*60)
  };

  const stopCircle = () =>
  {
    setShow(0)
    backgroundAudio1().pause()
    backgroundAudio2().pause()
    backaudio().pause()
  };

  const updateWorkSession = () =>
  {
    let distance = timeStart() - backaudio().currentTime;
    setTime(pad2(parseInt((distance % (60 * 60)) / 60))+":"+pad2(parseInt((distance % 60))))
    if(backaudio().paused)
    {
      if(3 == show())
      {
        setDuration(5)
        startCircle()
      }
    }

    if(3 == show())
    {
      let delay = 1000 - (backaudio().currentTime - parseInt(backaudio().currentTime))*1000
      if(100 < delay)
      {
        setTimeout(updateWorkSession, (1000 - (backaudio().currentTime - parseInt(backaudio().currentTime))*1000))
      }
      else
      {
        setTimeout(updateWorkSession, 1000)
      }
    }
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
      <span class="absolute bottom-0 left-16 sm:left-1 text-xs">{"v0.05"}</span>
      <Switch fallback={<div>Not Found</div>}>
        <Match when={0 == show()}>
          <button class="btn btn-blue" onClick={() => setShow(2)}>Breathing 4-6</button>
          <button class="btn btn-blue mt-3" onClick={() => {setDuration(10);startCircle();setWorkSession(true)}}>Working session</button>
        </Match>
        <Match when={1 == show()}>
          <BreathCircle percent={percent()} text={text()} count={count()}/>
          <button class="btn btn-blue" onClick={stopCircle}>Stop</button>
          <span class="absolute bottom-0 right-16 sm:right-1 text-xs">{time()}</span>
        </Match>
        <Match when={2 == show()}>
          <button class="btn btn-blue" onClick={() => {setDuration(10);startCircle();setWorkSession(false)}}>10 min</button>
          <button class="btn btn-blue mt-3 !px-6" onClick={() => {setDuration(5);startCircle();setWorkSession(false)}}>5 min</button>
          <button class="btn btn-blue mt-3 !px-6" onClick={() => {setDuration(1);startCircle();setWorkSession(false)}}>1 min</button>
          <button class="btn btn-blue mt-3 !px-6" onClick={() => setShow(0)}>Back</button>
        </Match>
        <Match when={3 == show()}>
          <button class="btn btn-blue" onClick={stopCircle}>Stop</button>
          <span class="absolute bottom-0 right-16 sm:right-1 text-xs">{time()}</span>
        </Match>
      </Switch>
      </header>
    </div>
  );
};

export default App;
