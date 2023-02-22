import { Album, Track as TrackType, Uuid, useTrack } from '../api';
import renderTime from '../utils/renderTime';

import styles from './Track.module.css';

export type TrackProps = {
  track: TrackType;
  album: Album;
  playing: boolean;
  handlePlay: (t: Uuid<TrackType>) => void;
};

const Track = ({ album, track, playing, handlePlay }: TrackProps) => {
  return (
    <div class={styles.trackContainer}>
      <div class={styles.trackNumBox}>{track.disk_number}</div>
      <div class={styles.trackTitleBox}>
        {track.title}
        {track.is_fcc && (
          <svg class={styles.fccSVG} viewBox="0 0 24 18">
            <path d="M3 6v6h1.5v-2H8V8.5H4.5v-1H8V6zm7.5 0c-.28 0-.52.1-.71.29A.94.94 0 0 0 9.5 7v4c0 .28.1.52.29.71.19.2.43.29.71.29h3c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71v-1H13v.5h-2v-3h2V8h1.5V7c0-.28-.1-.52-.29-.71A.97.97 0 0 0 13.5 6zm7 0c-.28 0-.52.1-.71.29a.94.94 0 0 0-.29.71v4c0 .28.1.52.29.71.19.2.43.29.71.29h3c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71v-1H20v.5h-2v-3h2V8h1.5V7c0-.28-.1-.52-.29-.71A.97.97 0 0 0 20.5 6z" />
          </svg>
        )}
        {/*props.album.highlights.split(',').map((element: string) => element.trim()).includes(props.track.id.toString()) &&
                    <svg class={styles.fccSVG} viewBox="0 0 50 50">
                        <path fill="gold" d="m16.15 37.75 7.85-4.7 7.85 4.75-2.1-8.9 6.9-6-9.1-.8L24 13.7l-3.55 8.35-9.1.8 6.9 6ZM11.65 44l3.25-14.05L4 20.5l14.4-1.25L24 6l5.6 13.25L44 20.5l-10.9 9.45L36.35 44 24 36.55ZM24 26.25Z"/>
                    </svg>
                */}
      </div>
      {album.artist !== track.artist && (
        <div class={styles.trackArtistBox}>{track.artist}</div>
      )}
      <div class={styles.trackLengthBox}>{renderTime(track.length)}</div>
      <button class={styles.trackmanBox}>Send To Trackman</button>
      <button
        class={playing ? styles.playBoxOn : styles.playBoxOff}
        onClick={() => handlePlay(track.uuid)}
      >
        <svg class={styles.playButton} viewBox="0 0 20 20">
          <path
            fill={playing ? 'white' : 'black'}
            d="M6.833 15.583V4.375l8.792 5.604Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Track;
