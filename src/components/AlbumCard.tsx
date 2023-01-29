import styles from './AlbumCard.module.css';

const AlbumCard = (props: {
  album: any;
  cUUID: string;
  handleShowInfo: Function;
}) => {
  const stackColors: { [key: string]: string } = {
    RCK: '#F87171',
    RPM: '#2DD4BF',
  };

  return (
    <div
      style={{ backgroundColor: stackColors[props.album.collection] || 'gray' }}
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
