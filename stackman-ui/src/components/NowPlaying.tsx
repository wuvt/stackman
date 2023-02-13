import { Album } from '../api';

import styles from './NowPlaying.module.css';

const NowPlaying = (props: { album: Album; cID: number }) => {
  return (
    <div class={styles.nowPlayingContainer}>
      <div class={styles.albumArt}>
        {props.cID === -1 && <div class={styles.albumArtBlank}></div>}
        {props.cID !== -1 && <img src={props.album.img} />}
      </div>
      <div class={styles.nowPlayingInfo}>
        <div class={styles.nowPlayingTitle}>
          {props.cID === -1
            ? 'No Track Selected'
            : props.album.tracks[props.cID - 1].title}
        </div>
        <div class={styles.nowPlayingArtist}>
          {props.cID === -1 ? '' : props.album.artist}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
