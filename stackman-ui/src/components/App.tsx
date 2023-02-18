import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import Info from './Info';
import Library from './Library';
import NowPlaying from './NowPlaying';
import Player from './Player';
import Select from './Select';
import { Album, Uuid } from '../api';

import styles from './App.module.css';

const stacks = [
  { key: 'ALL', value: 'All Categories' },
  { key: 'RCK', value: 'Rock/Pop' },
  { key: 'RPM', value: 'Electronic' },
];

const FilterBar = (props: { newOn: boolean; handleToggleNew: () => void }) => {
  return (
    <div class={styles.filterBar}>
      <input
        aria-label="Search"
        class={styles.search}
        placeholder="Search..."
      ></input>
      <Select name="stacks" label="Current stack" items={stacks}></Select>
      <button
        id="newButton"
        class={props.newOn ? styles.newButtonOn : styles.newButtonOff}
        onClick={() => props.handleToggleNew()}
      >
        <svg class={styles.newSVG} viewBox="0 0 20 20">
          <path
            fill={props.newOn ? 'white' : 'black'}
            d="M6.833 19.708 5.062 16.75l-3.374-.771.333-3.417L-.25 10l2.271-2.562-.333-3.417 3.374-.771L6.833.292 10 1.646 13.167.292l1.771 2.958 3.374.771-.333 3.417L20.25 10l-2.271 2.562.333 3.417-3.374.771-1.771 2.958L10 18.354Zm2.105-6.312 5.354-5.354-1.459-1.396-3.895 3.875-1.75-1.792-1.48 1.459Z"
          />
        </svg>
      </button>
    </div>
  );
};

const App = () => {
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [newOn, setNewOn] = useState(false);
  const [currentUUID, setCurrentUUID] = useState<Uuid<Album> | null>(null);
  const [playingUUID, setPlayingUUID] = useState<Uuid<Album> | null>(null);
  const [currentID, setCurrentID] = useState(-1);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/albums.json')
      .then((res) => res.json())
      .then((albums) => setAlbums(albums))
      .catch((e) => console.error('Error fetching albums: ', e));
  }, []);

  const handleShowInfo = useCallback((uuid: Uuid<Album>) => {
    setCurrentUUID((prevUUID) => (prevUUID === uuid ? null : uuid));
  }, []);

  const handlePlay = useCallback((uuid: Uuid<Album>, id: number) => {
    setCurrentID((prevID) => (prevID === id ? -1 : id));
    setPlayingUUID(uuid);
    console.log(uuid, id);
  }, []);

  const handleToggleNew = useCallback(() => {
    setNewOn((prevOn) => !prevOn);
  }, []);

  if (!albums) {
    return null;
  }

  const currentAlbum = albums.filter((album) => {
    return album.uuid === currentUUID;
  })[0];
  const playingAlbum = albums.filter((album) => {
    return album.uuid === playingUUID;
  })[0];

  return (
    <div class={styles.mainContainer}>
      <div class={styles.exploreContainer}>
        <div id="library" class={styles.libraryContainer}>
          <FilterBar newOn={newOn} handleToggleNew={handleToggleNew} />
          <Library
            albums={albums}
            cUUID={currentUUID}
            handleShowInfo={handleShowInfo}
            handlePlay={handlePlay}
            newOn={newOn}
            playingUUID={playingUUID}
            cID={currentID}
          />
        </div>
        <Info album={currentAlbum} />
      </div>
      <div class={styles.playbackContainer}>
        <NowPlaying album={playingAlbum} cID={currentID} />
        <Player album={playingAlbum} cID={currentID} />
      </div>
    </div>
  );
};

export default App;
