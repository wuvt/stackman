import Album from './Album';
import AlbumCard from './AlbumCard';
import { Album as AlbumType, Collection, Track, Uuid, useAlbums } from '../api';

import styles from './Library.module.css';

export type LibraryProps = {
  currentAlbum?: Uuid<AlbumType>;
  playingTrack?: Uuid<Track>;
  collection?: Collection;
  showNew: boolean;
  query: string;
  handleShowInfo: (a: Uuid<AlbumType>) => void;
  handlePlay: (t: Uuid<Track>) => void;
};

const Library = ({
  currentAlbum,
  playingTrack,
  collection,
  showNew,
  query,
  handleShowInfo,
  handlePlay,
}: LibraryProps) => {
  const albums = useAlbums({
    collection,
    showNew,
    search: query,
  });

  return (
    <div class={styles.libraryContainer}>
      {!showNew ? (
        albums.data?.map((album) => (
          <Album
            album={album}
            key={album.uuid}
            showing={currentAlbum === album.uuid}
            playingTrack={playingTrack}
            handleShowInfo={handleShowInfo}
            handlePlay={handlePlay}
          />
        ))
      ) : (
        <div className={styles.cardContainer}>
          {albums.data?.map((album) => (
            <AlbumCard
              album={album}
              key={album.uuid}
              handleShowInfo={handleShowInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
