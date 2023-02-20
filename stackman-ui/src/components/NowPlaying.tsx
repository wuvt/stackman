import { Track, Uuid, useTrack } from '../api';

import styles from './NowPlaying.module.css';

const NowPlaying = (props: { track: Uuid<Track> | undefined }) => {
  const track = useTrack(props.track);

  return (
    <div class={styles.nowPlayingContainer}>
      <div class={styles.albumArt}>
        {track.data ? (
          <img src={track.data.album.img} />
        ) : (
          <div class={styles.albumArtBlank}></div>
        )}
      </div>
      <div class={styles.nowPlayingInfo}>
        <div class={styles.nowPlayingTitle}>
          {props.track
            ? track.data
              ? track.data.title
              : 'Loading...'
            : 'No Track Selected'}
        </div>
        <div class={styles.nowPlayingArtist}>{track.data?.artist ?? ''}</div>
      </div>
    </div>
  );
};

export default NowPlaying;
