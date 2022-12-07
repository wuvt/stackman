import { useRef, useState } from 'preact/hooks';

import useSpring from '../hooks/useSpring';
import classnames from '../utils/classnames';

import styles from './Player.module.css';
import convertSecondsToLength from "../utils/convertSecondsToLength";

import soundPlaceholder from './metronome.mp3'

type PlayButtonProps = {
  disabled: boolean;
  playing: boolean;
  onClick: () => void;
}

// Icons based on google/material-design-icons
const PlayButton = (
  { disabled, playing, onClick }: PlayButtonProps
) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useSpring(playing, 0.6, 700, 28, s => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = `rotate(${s.currentValue * -90}deg)`;
    }
  })

  return (
    <button
      aria-label={playing ? "Pause" : "Play"}
      class={classnames(styles.playButton, {
        [styles.playButtonDisabled]: disabled,
      })}
      disabled={disabled}
      ref={buttonRef}
      onClick={onClick}
    >
      <svg aria-hidden viewBox="0 0 48 48">
        <defs>
          <mask id="icon">
            <rect fill="white" x="0" y="0" width="100%" height="100%" />
            <path
              fill="black"
              d="m18.85 33 14.2-9-0.2-0.1-14 0Z"
              style={playing ? { d: 'path("m15.8 29.9 16.4 0 0-3.4-16.4 0Z")' } : { }}
            />
            <path
              fill="black"
              d="m18.85 24 14 0.1 0.2-0.1-14.2-9Z"
              style={playing ? { d: 'path("m15.8 21.5 16.4 0 0-3.4-16.4 0Z")' } : { }}
            />
          </mask>
        </defs>

        <circle fill="currentColor" cx="24" cy="24" r="21.3" mask="url(#icon)" />
      </svg>
    </button>
  );
}

const Player = (props: { album: any, cID: number, audio: any;}) => {
  const [ playing, setPlaying ] = useState(false);

  function updateTime() {
    const timeText = document.getElementById("audioCurrentTime");
    if(timeText !== null){
      timeText.innerHTML = convertSecondsToLength(props.audio.currentTime);
    }
    const playbar = document.getElementById("playbar");
    if(playbar !== null){
      // @ts-ignore
      playbar.value = (props.audio.currentTime*100).toString();
    }
  }

  props.audio.ontimeupdate = function() {updateTime()};

  function playClicked() {
    setPlaying(prev => !prev)
    if(playing){
      props.audio.pause()
    }
    else{
      props.audio.play()
    }
  }

  function sliderChange() {
    const playbar = document.getElementById("playbar");
    if(playbar !== null){
      // @ts-ignore
      props.audio.currentTime = parseFloat(playbar.value)/100
    }
  }

  return (
    <div class={styles.playerContainer}>
      <PlayButton
        disabled={props.cID === -1}
        playing={playing}
        onClick={() => playClicked()}
      />
      <span id="audioCurrentTime">0:00</span>
      {props.cID !== -1 && <input type="range" min="0" max={(props.album.tracks[props.cID-1].length*100).toString()} value="0" id="playbar" class={styles.playSlider}
                                  onInput={sliderChange}/>}
      {props.cID === -1 && <input type="range" min="0" max="100" value="0" id="playbar" class={styles.playSlider} disabled/>}
      {/*<div class={styles.playBarRail}>
        {props.cID !== -1 &&  <div id="barRail" class={styles.playBarFill} style={{ width: (props.audio.currentTime/props.album.tracks[props.cID-1].length*100).toString()+'%' }}></div>}
        {props.cID === -1 &&  <div class={styles.playBarFill} style={{ width: '0%' }}></div>}
      <div class={styles.playBarThumb}></div>
      </div>*/}


      {props.cID !== -1 && <span>{convertSecondsToLength(props.album.tracks[props.cID-1].length)}</span>}
        {props.cID === -1 && <span>0:00</span>}
    </div>
  );
}

export default Player;
