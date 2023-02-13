import { useEffect, useRef, useState } from 'preact/hooks';

import { Album } from '../api';
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

const loadAudio = async (
  album_uuid: string,
  track_index: number,
  signal: AbortSignal
) => {
  const res = await fetch(
    `http://localhost:8000/api/v1/album/${album_uuid}/tracks`,
    { signal }
  );
  const tracks = await res.json();
  const track_audio = await fetch(
    `http://localhost:8000${tracks[track_index - 1].audio}`,
    { signal }
  );

  return await track_audio.blob();
};

const Player = (props: { album: Album; cID: number }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const audio = useRef(new Audio());

  useEffect(() => {
    audio.current.addEventListener('timeupdate', (e) => {
      setCurrentTime((e.currentTarget as HTMLAudioElement).currentTime);
    });
    audio.current.addEventListener('loadstart', () => setCurrentTime(0));
  }, []);

  useEffect(() => {
    setPlaying(false);
    setLoaded(false);
    audio.current.src = '';

    const controller = new AbortController();
    loadAudio(props.album.uuid, props.cID, controller.signal)
      .then((blob) => {
        audio.current.src = URL.createObjectURL(blob);
        setLoaded(true);
      })
      .catch((err) => console.log(`Download error: ${err.message}`));

    return () => controller.abort();
  }, [props]);

  useEffect(() => {
    if (playing) {
      audio.current.play();
    } else {
      audio.current.pause();
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
        disabled={!loaded}
        class={styles.playSlider}
        onChange={(e) => {
          audio.current.currentTime = parseFloat(
            (e.currentTarget as HTMLInputElement).value
          );
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
