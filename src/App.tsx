import { createSignal, type Component, Show } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { BreathCircle } from "./BreathCircle";

const App: Component = () =>
{

  const [percent, setPercent] = createSignal(0);
  const [state, setState] = createSignal(0);
  const [inhale, setInhale] = createSignal(4);
  const [exhale, setExhale] = createSignal(6);
  const [count, setCount] = createSignal(4);
  const [text, setText] = createSignal("");
  const [show, setShow] = createSignal(false);

  const updateCircle = () =>
  {
    if(0 == state())
    {
      if(0 == percent())
      {
        setCount(inhale()+1)
        new Audio('audio/inhale.mp3').play()
        setText("Inhale")
      }

      setPercent(percent() + 100/inhale())
    }
    else if(1 == state())
    {
      if(100 == percent())
      {
        setCount(exhale()+1)
        new Audio('audio/exhale.mp3').play()
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

    setCount(count()-1)
    setTimeout(updateCircle, 1000)
  }

  const startCircle = () =>
  {
    setShow(true)
    setTimeout(updateCircle, 50)
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Show
          when={show()}
          fallback={<button class="btn btn-blue" onClick={startCircle}>Start</button>}
        >
          <BreathCircle percent={percent()} text={text()} count={count()}/>
        </Show>
      </header>
    </div>
  );
};

export default App;
