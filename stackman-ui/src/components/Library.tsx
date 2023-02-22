import Album from './Album';
import AlbumCard from './AlbumCard';
import { Album as AlbumType, Collection, Track, Uuid, useAlbums } from '../api';

import styles from './Library.module.css';

export type LibraryProps = {
  cUUID: Uuid<AlbumType> | null;
  playingTrack?: Uuid<Track>;
  collection?: Collection;
  query: string;
  handleShowInfo: (a: Uuid<AlbumType>) => void;
  handlePlay: (t: Uuid<Track>) => void;
  newOn: boolean;
};

const Library = ({
  cUUID,
  playingTrack,
  collection,
  query,
  handleShowInfo,
  handlePlay,
  newOn,
}: LibraryProps) => {
  const albums = useAlbums({
    collection: collection,
    showNew: newOn,
    search: query,
  });

  return (
    <div class={styles.libraryContainer}>
      {!newOn &&
        albums.data?.map((album) => {
          return (
            <Album
              album={album}
              cUUID={cUUID}
              handleShowInfo={handleShowInfo}
              handlePlay={handlePlay}
              playingTrack={playingTrack}
            />
          );
        })}
      {newOn && (
        <div className={styles.cardContainer}>
          {albums.data?.map((album) => (
            <AlbumCard
              album={album}
              cUUID={cUUID}
              handleShowInfo={handleShowInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
