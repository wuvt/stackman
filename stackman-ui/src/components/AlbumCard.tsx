import { Album, CollectionColors, Uuid } from '../api';

import styles from './AlbumCard.module.css';

const AlbumCard = (props: {
  album: Album;
  cUUID: Uuid<Album> | null;
  handleShowInfo: (a: Uuid<Album>) => void;
}) => {
  return (
    <div
      style={{
        backgroundColor: CollectionColors[props.album.collection] || 'gray',
      }}
      class={styles.albumCardContainer}
    >
      <img
        className={styles.image}
        src={props.album.img}
        alt={props.album.title}
      />
      <div className={styles.title}>{props.album.title}</div>
      <div>{props.album.artist}</div>
    </div>
  );
};

export default AlbumCard;
