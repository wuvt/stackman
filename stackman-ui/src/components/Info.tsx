import { Album, Uuid, useAlbum } from '../api';
import classnames from '../utils/classnames';

import styles from './Info.module.css';

const Info = (props: { album?: Uuid<Album> }) => {
  const album = useAlbum(props.album);

  return (
    <div id="info" class={styles.infoPanel}>
      {album.data && (
        <>
          <div class={styles.title}>{album.data.title}</div>
          <div class={styles.infoHeader}>
            <div class={classnames(styles.artist, styles.textBox)}>
              {album.data.artist}
            </div>
            <div class={classnames(styles.year, styles.textBox)}>
              {album.data.year}
            </div>
          </div>
          <div class={styles.infoReview}>
            <div class={styles.albumArt}>
              <img src={album.data.img} />
            </div>
            <div class={classnames(styles.genre, styles.textBox)}>
              {album.data.genre}
            </div>
            {album.data.review}
          </div>
          <div class={styles.infoFooter}>
            <div class={classnames(styles.highlights, styles.textBox)}>
              Favs: {album.data.highlights}
            </div>
            <div class={classnames(styles.label, styles.textBox)}>
              (P) {album.data.label}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Info;
