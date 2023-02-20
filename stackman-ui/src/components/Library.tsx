import Album from './Album';
import AlbumCard from './AlbumCard';
import { Album as AlbumType, Collection, Track, Uuid, useAlbums } from '../api';

import styles from './Library.module.css';

const Library = (props: {
  cUUID: Uuid<AlbumType> | null;
  playingTrack?: Uuid<Track>;
  collection?: Collection;
  query: string;
  handleShowInfo: (a: Uuid<AlbumType>) => void;
  handlePlay: (t: Uuid<Track>) => void;
  newOn: boolean;
}) => {
  const albums = useAlbums({
    collection: props.collection,
    showNew: props.newOn,
    search: props.query,
  });

  return (
    <div class={styles.libraryContainer}>
      {!props.newOn &&
        albums.data?.map((album) => {
          return (
            <Album
              album={album}
              cUUID={props.cUUID}
              handleShowInfo={props.handleShowInfo}
              handlePlay={props.handlePlay}
              playingTrack={props.playingTrack}
            />
          );
        })}
      {props.newOn && (
        <div className={styles.cardContainer}>
          {albums.data?.map((album) => (
            <AlbumCard
              album={album}
              cUUID={props.cUUID}
              handleShowInfo={props.handleShowInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
