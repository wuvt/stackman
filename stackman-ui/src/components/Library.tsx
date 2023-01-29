import Album from './Album';
import AlbumCard from './AlbumCard';
import styles from './Library.module.css';

const Library = (props: {
  albums: any;
  cUUID: string;
  playingUUID: string;
  cID: number;
  handleShowInfo: Function;
  handlePlay: Function;
  newOn: boolean;
}) => {
  return (
    <div class={styles.libraryContainer}>
      {!props.newOn &&
        props.albums.map((album: any) => {
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
          {props.albums.map((album: any) => {
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