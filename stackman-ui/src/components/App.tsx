import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import Info from './Info';
import Library from './Library';
import NowPlaying from './NowPlaying';
import Player from './Player';
import Select from './Select';
import {
  Album,
  Collection,
  CollectionNames,
  Track,
  Uuid,
  useAlbums,
} from '../api';

import styles from './App.module.css';

type FilterBarProps = {
  showNew: boolean;
  handleCollectionChange: (c?: Collection) => void;
  handleToggleNew: () => void;
  handleQueryChange: (q: string) => void;
};

const FilterBar = ({
  showNew,
  handleCollectionChange,
  handleToggleNew,
  handleQueryChange,
}: FilterBarProps) => {
  const items = [
    { key: 'ALL', value: 'All Categories' },
    ...Object.entries(CollectionNames).map(([key, value]) => ({ key, value })),
  ];

  const handleInput = (e: Event) => {
    handleQueryChange((e.currentTarget as HTMLInputElement).value);
  };
  const handleSelect = (s: string) => {
    handleCollectionChange(s === 'ALL' ? undefined : (s as Collection));
  };

  return (
    <div class={styles.filterBar}>
      <input
        aria-label="Search"
        class={styles.search}
        placeholder="Search..."
        onInput={handleInput}
      ></input>
      <Select
        name="stacks"
        label="Current stack"
        items={items}
        onChange={handleSelect}
      />
      <button
        id="newButton"
        class={showNew ? styles.newButtonOn : styles.newButtonOff}
        onClick={handleToggleNew}
      >
        <svg class={styles.newSVG} viewBox="0 0 20 20">
          <path
            fill={showNew ? 'white' : 'black'}
            d="M6.833 19.708 5.062 16.75l-3.374-.771.333-3.417L-.25 10l2.271-2.562-.333-3.417 3.374-.771L6.833.292 10 1.646 13.167.292l1.771 2.958 3.374.771-.333 3.417L20.25 10l-2.271 2.562.333 3.417-3.374.771-1.771 2.958L10 18.354Zm2.105-6.312 5.354-5.354-1.459-1.396-3.895 3.875-1.75-1.792-1.48 1.459Z"
          />
        </svg>
      </button>
    </div>
  );
};

const App = () => {
  const [currentAlbum, setCurrentAlbum] = useState<Uuid<Album> | undefined>();
  const [playingTrack, setPlayingTrack] = useState<Uuid<Track> | undefined>();
  const [collection, setCollection] = useState<Collection | undefined>();
  const [showNew, setShowNew] = useState(false);
  const [query, setQuery] = useState<string>('');

  const handleShowInfo = useCallback((album: Uuid<Album>) => {
    setCurrentAlbum((prev) => (prev === album ? undefined : album));
  }, []);
  const handlePlay = useCallback((track: Uuid<Track>) => {
    setPlayingTrack((prev) => (prev === track ? undefined : track));
  }, []);
  const handleToggleNew = useCallback(() => {
    setShowNew((prev) => !prev);
  }, []);

  return (
    <div class={styles.mainContainer}>
      <div class={styles.exploreContainer}>
        <div id="library" class={styles.libraryContainer}>
          <FilterBar
            showNew={showNew}
            handleCollectionChange={setCollection}
            handleToggleNew={handleToggleNew}
            handleQueryChange={setQuery}
          />
          <Library
            currentAlbum={currentAlbum}
            playingTrack={playingTrack}
            collection={collection}
            showNew={showNew}
            query={query}
            handleShowInfo={handleShowInfo}
            handlePlay={handlePlay}
          />
        </div>
        <Info album={currentAlbum} />
      </div>
      <div class={styles.playbackContainer}>
        <NowPlaying track={playingTrack} />
        <Player track={playingTrack} />
      </div>
    </div>
  );
};

export default App;
