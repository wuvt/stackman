import classnames from '../utils/classnames';

import styles from './Info.module.css';

const Info = (props: { album: any }) => {
  return (
    <div id="info" class={styles.infoPanel}>
      {props.album && (
        <>
          <div class={styles.title}>{props.album.title}</div>
          <div class={styles.infoHeader}>
            <div class={classnames(styles.artist, styles.textBox)}>
              {props.album.artist}
            </div>
            <div class={classnames(styles.year, styles.textBox)}>
              {props.album.year}
            </div>
          </div>
          <div class={styles.infoReview}>
            <div class={styles.albumArt}>
              <img src={props.album.img} />
            </div>
            <div class={classnames(styles.genre, styles.textBox)}>
              {props.album.genre}
            </div>
            {props.album.review}
          </div>
          <div class={styles.infoFooter}>
            <div class={classnames(styles.highlights, styles.textBox)}>
              Favs: {props.album.highlights}
            </div>
            <div class={classnames(styles.label, styles.textBox)}>
              (P) {props.album.label}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Info;
