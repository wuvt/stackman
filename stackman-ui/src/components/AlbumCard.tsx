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
      className={styles.albumCardContainer}
    >
      <div className={styles.accOverlay}></div>
      <div
        className={styles.coverContainer}
        onClick={() => handleShowInfo(album.uuid)}
      >
        <img className={styles.image} src={album.img} alt={album.title} />
        <span className={styles.coverOverlay}>
          <svg className="w-12 h-12" viewBox="0 0 48 48">
            <path
              fill="white"
              d="M22.15 34.45h3.95V22h-3.95ZM24 19.15q1.05 0 1.7-.65.65-.65.65-1.65 0-1.15-.65-1.775T24 14.45q-1.1 0-1.725.625T21.65 16.8q0 1.05.65 1.7.65.65 1.7.65Zm0 25.9q-4.35 0-8.2-1.625-3.85-1.625-6.725-4.5Q6.2 36.05 4.575 32.2 2.95 28.35 2.95 24q0-4.4 1.625-8.225 1.625-3.825 4.5-6.7T15.8 4.55Q19.65 2.9 24 2.9t8.225 1.65Q36.1 6.2 38.95 9.075q2.85 2.875 4.5 6.725 1.65 3.85 1.65 8.2 0 4.4-1.65 8.225-1.65 3.825-4.525 6.675-2.875 2.85-6.725 4.5-3.85 1.65-8.2 1.65Zm0-4.55q6.85 0 11.675-4.825Q40.5 30.85 40.5 24q0-6.85-4.825-11.675Q30.85 7.5 24 7.5q-6.85 0-11.675 4.825Q7.5 17.15 7.5 24q0 6.85 4.825 11.675Q17.15 40.5 24 40.5ZM24 24Z"
            />
          </svg>
        </span>
      </div>
      <div className={styles.accText}>
        <div className={styles.title}>{album.title}</div>
        <div>{album.artist}</div>
      </div>
    </div>
  );
};

export default AlbumCard;
