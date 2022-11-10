import styles from './Track.module.css';

const Track = (props: { album: any, track: any, index: number;}) => {
    return (
        <div class={styles.trackContainer}>
            <div class={styles.trackNumBox}>{props.track.id}</div>
            <div class={styles.trackTitleBox}>{props.track.title}
                {props.track.is_fcc &&
                    <svg class={styles.fccSVG} viewBox="0 0 24 18">
                      <path d="M3 6v6h1.5v-2H8V8.5H4.5v-1H8V6zm7.5 0c-.28 0-.52.1-.71.29A.94.94 0 0 0 9.5 7v4c0 .28.1.52.29.71.19.2.43.29.71.29h3c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71v-1H13v.5h-2v-3h2V8h1.5V7c0-.28-.1-.52-.29-.71A.97.97 0 0 0 13.5 6zm7 0c-.28 0-.52.1-.71.29a.94.94 0 0 0-.29.71v4c0 .28.1.52.29.71.19.2.43.29.71.29h3c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71v-1H20v.5h-2v-3h2V8h1.5V7c0-.28-.1-.52-.29-.71A.97.97 0 0 0 20.5 6z" />
                    </svg>
                  }
            </div>
            {props.album.artist !== props.track.artist &&
                <div class={styles.trackArtistBox}>{props.track.artist}</div>
            }
            <div class={styles.trackLengthBox}>{Math.floor(props.track.length/60)}:{(props.track.length%60).toString().padStart(2, '0')}</div>
            <button class={styles.trackmanBox}>Send To Trackman</button>
            <button class={styles.playBox}>
                <svg class={styles.playButton} viewBox="0 0 20 20">
                    <path fill="currentColor" d="M6.833 15.583V4.375l8.792 5.604Z"/>
                </svg>
            </button>
        </div>
    );
}


export default Track;
