import Album from "./Album";

const Library = (props: { albums: any, cUUID: number, handleInfo: Function;}) => {
  return (
    <div>
        {props.albums.map((album: any) => {
            return <Album album={album} cUUID={props.cUUID} handleInfo={props.handleInfo}/>;
        })}
    </div>
  );
}


export default Library;
