import { useRef, useState } from 'preact/hooks';

import useSpring from '../hooks/useSpring';
import classnames from '../utils/classnames';

import styles from './Player.module.css';

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
      class={classnames(styles.playButton, {
        [styles.playButtonDisabled]: disabled,
      })}
      disabled={disabled}
      ref={buttonRef}
      onClick={onClick}
    >
      <svg viewBox="0 0 48 48" className={styles.playButton}>
        <defs>
          <mask id="icon">
            <rect fill="white" x="0" y="0" width="100%" height="100%" />
            <path
              fill="black"
              d="m18.85 33 14.2-9.05 0 0-14.2 0Z"
              style={playing ? { d: 'path("m15.8 29.9 16.4 0 0-3.4-16.4 0Z")' } : { }}
            />
            <path
              fill="black"
              d="m18.85 24.95 14.2 0 0 0-14.2-9.05Z"
              style={playing ? { d: 'path("m15.8 21.5 16.4 0 0-3.4-16.4 0Z")' } : { }}
            />
          </mask>
        </defs>

        <circle fill="currentColor" cx="24" cy="24" r="21.25" mask="url(#icon)" />
      </svg>
    </button>
  );
}

const Player = () => {
  const [ playing, setPlaying ] = useState(false);

  return (
    <div class={styles.playerContainer}>
      <div class={styles.playButtonContainer}>
        <PlayButton
          disabled={false}
          playing={playing}
          onClick={() => setPlaying(prev => !prev)}
        />
      </div>
      <div class={styles.playBarContainer}>
        <div>0:00</div>
        <div class={styles.playBarRail}>
          <div class={styles.playBarFill} style={{ width: '0' }}></div>
          <div class={styles.playBarThumb}></div>
        </div>
        <div>0:00</div>
      </div>
    </div>
  );
}

export default Player;
