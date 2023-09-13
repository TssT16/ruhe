import { createEffect, onMount } from "solid-js";

//source: https://css-tricks.com/building-progress-ring-quickly/
export function BreathCircle(props)
{
  createEffect(() => {
    var circle = document.querySelector('circle');
    circle.classList.add("progress-ring__circle")
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
  
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
  
    const offset = circumference - parseInt(props.percent) / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  });

  return <>
    <svg
      class="progress-ring"
      width="120"
      height="120">
      <circle
        class="progress-ring__circle"
        stroke="white"
        stroke-width="4"
        fill="transparent"
        stroke-Dasharray="327 327"
        stroke-Dashoffset="327"
        r="52"
        cx="60"
        cy="60"/>
      
    </svg>
    <span class="text-2xl">{props.count}</span>
  </>
}