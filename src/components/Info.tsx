import classnames from '../utils/classnames';

import styles from './Info.module.css';

const Info = () => {
  const album = {
    title: 'Album Title',
    artist: 'Album Artist',
    year: 'YYYY',
    img: '',
    genre: 'Album Genre',
    review: 'This is a detailed review of the album',
    highlights: '1, 2, 3',
    label: 'Record Label',
  };

  return (
    <div id="info" class={styles.infoPanel}>
      {album && (
        <>
          <div class={styles.title}>{album.title}</div>
          <div class={styles.infoHeader}>
            <div class={classnames(styles.artist, styles.textBox)}>
              {album.artist}
            </div>
            <div class={classnames(styles.year, styles.textBox)}>
              {album.year}
            </div>
          </div>
          <div class={styles.infoReview}>
            <div class={styles.albumArt}>
              <img src={album.img} />
            </div>
            <div class={classnames(styles.genre, styles.textBox)}>
              {album.genre}
            </div>
            {album.review}
          </div>
          <div class={styles.infoFooter}>
            <div class={classnames(styles.highlights, styles.textBox)}>
              Favs: {album.highlights}
            </div>
            <div class={classnames(styles.label, styles.textBox)}>
              (P) {album.label}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Info;
