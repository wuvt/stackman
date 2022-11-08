import Album from "./Album";
import AlbumCard from "./AlbumCard";
import styles from './Library.module.css';

const Library = (props: { albums: any, cUUID: string, handleInfo: Function, newOn: boolean;}) => {
  return (
    <div>
        {!props.newOn && props.albums.map((album: any) => {
            return <Album album={album} cUUID={props.cUUID} handleInfo={props.handleInfo}/>;
        })}
        {props.newOn && <div className={styles.cardContainer}>
            {props.albums.map((album: any) => {
              if (album.year === 2022)
                return <AlbumCard album={album} cUUID={props.cUUID} handleInfo={props.handleInfo}/>;
            })}
          </div>}
    </div>
  );
}


export default Library;
