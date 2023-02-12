import { RefObject } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import useSpring from '../hooks/useSpring';
import classnames from '../utils/classnames';
import renderTime from '../utils/renderTime';

import styles from './Player.module.css';

type PlayButtonProps = {
  disabled: boolean;
  playing: boolean;
  onClick: () => void;
};

// Icons based on google/material-design-icons
const PlayButton = ({ disabled, playing, onClick }: PlayButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useSpring(playing, 0.6, 700, 28, (s) => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = `rotate(${s.currentValue * -90}deg)`;
    }
  });

  return (
    <button
      aria-label={playing ? 'Pause' : 'Play'}
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
              style={
                playing ? { d: 'path("m15.8 29.9 16.4 0 0-3.4-16.4 0Z")' } : {}
              }
            />
            <path
              fill="black"
              d="m18.85 24 14 0.1 0.2-0.1-14.2-9Z"
              style={
                playing ? { d: 'path("m15.8 21.5 16.4 0 0-3.4-16.4 0Z")' } : {}
              }
            />
          </mask>
        </defs>

        <circle
          fill="currentColor"
          cx="24"
          cy="24"
          r="21.3"
          mask="url(#icon)"
        />
      </svg>
    </button>
  );
};

const Player = (props: {
  album: any;
  cID: number;
  audio: RefObject<HTMLAudioElement>;
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const updateTime = (e: Event) => {
      setCurrentTime((e.target as HTMLAudioElement).currentTime);
    };

    if (props.audio.current) {
      props.audio.current.ontimeupdate = updateTime;
      props.audio.current.onchange = updateTime;
      props.audio.current.onloadstart = () => setCurrentTime(0);
    }
  });

  useEffect(() => {
    if (!props.audio.current) {
      return;
    }

    if (playing) {
      props.audio.current.play();
    } else {
      props.audio.current.pause();
    }
  }, [playing]);

  return (
    <div class={styles.playerContainer}>
      <PlayButton
        disabled={props.cID === -1}
        playing={playing}
        onClick={() => setPlaying((prev) => !prev)}
      />
      <span>{renderTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={props.cID !== -1 ? props.album.tracks[props.cID - 1].length : 1}
        value={currentTime}
        id="playbar"
        disabled={props.cID === -1}
        class={styles.playSlider}
        onChange={(e) => {
          if (props.audio.current) {
            props.audio.current.currentTime = parseFloat(
              (e.target as HTMLInputElement).value
            );
          }
        }}
      />
      {/*<div class={styles.playBarRail}>
        {props.cID !== -1 &&  <div id="barRail" class={styles.playBarFill} style={{ width: (props.audio.currentTime/props.album.tracks[props.cID-1].length*100).toString()+'%' }}></div>}
        {props.cID === -1 &&  <div class={styles.playBarFill} style={{ width: '0%' }}></div>}
      <div class={styles.playBarThumb}></div>
      </div>*/}
      <span>
        {renderTime(
          props.cID !== -1 ? props.album.tracks[props.cID - 1].length : 0
        )}
      </span>
    </div>
  );
};

export default Player;
