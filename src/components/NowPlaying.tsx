import styles from './NowPlaying.module.css';

const NowPlaying = () => {
  return (
    <div class={styles.nowPlayingContainer}>
      <div class={styles.albumArt}>
        <div class={styles.albumArtBlank}></div>
      </div>
      <div class={styles.nowPlayingInfo}>
        <div class={styles.nowPlayingTitle}>
          {'No Track Selected'}
        </div>
        <div class={styles.nowPlayingArtist}>
          {' '}
        </div>
      </div>
    </div>
  );
}

export default NowPlaying;
