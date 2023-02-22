import { Track, Uuid, useTrack } from '../api';

import styles from './NowPlaying.module.css';

export type NowPlayingProps = {
  track?: Uuid<Track>;
};

const NowPlaying = (props: NowPlayingProps) => {
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
