import { Album, CollectionColors, Uuid } from '../api';

import styles from './AlbumCard.module.css';

export type AlbumCardProps = {
  album: Album;
  handleShowInfo: (a: Uuid<Album>) => void;
};

const AlbumCard = ({ album, handleShowInfo }: AlbumCardProps) => {
  return (
    <div
      style={{ backgroundColor: CollectionColors[album.collection] ?? 'gray' }}
      class={styles.albumCardContainer}
    >
      <img className={styles.image} src={album.img} alt={album.title} />
      <div className={styles.title}>{album.title}</div>
      <div>{album.artist}</div>
    </div>
  );
};

export default AlbumCard;
