import Album from './Album';
import AlbumCard from './AlbumCard';
import { Album as AlbumType, Uuid } from '../api';

import styles from './Library.module.css';

const Library = (props: {
  albums: AlbumType[];
  cUUID: Uuid<AlbumType> | null;
  playingUUID: Uuid<AlbumType> | null;
  cID: number;
  handleShowInfo: (a: Uuid<AlbumType>) => void;
  handlePlay: (a: Uuid<AlbumType>, t: number) => void;
  newOn: boolean;
}) => {
  return (
    <div class={styles.libraryContainer}>
      {!props.newOn &&
        props.albums.map((album) => {
          return (
            <Album
              album={album}
              cUUID={props.cUUID}
              handleShowInfo={props.handleShowInfo}
              handlePlay={props.handlePlay}
              playingUUID={props.playingUUID}
              cID={props.cID}
            />
          );
        })}
      {props.newOn && (
        <div className={styles.cardContainer}>
          {props.albums.map((album) => {
            if (album.year === 2022)
              return (
                <AlbumCard
                  album={album}
                  cUUID={props.cUUID}
                  handleShowInfo={props.handleShowInfo}
                />
              );
          })}
        </div>
      )}
    </div>
  );
};

export default Library;
