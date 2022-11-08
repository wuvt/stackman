import Info from './Info';
import Library from './Library';
import NowPlaying from './NowPlaying';
import Player from './Player';
import Select from './Select';

import styles from './App.module.css';
import {useCallback, useState} from "preact/hooks";

const stacks = [
  { key: 'ALL', value: 'All Categories' },
  { key: 'RCK', value: 'Rock/Pop' },
  { key: 'RPM', value: 'Electronic' },
];

const albums = [
    {
        title: 'Album 1',
        artist: 'Album Artist',
        year: 'YYYY',
        img: '',
        genre: 'Rock',
        stack: 'RCK',
        review: 'This is a detailed review of the album',
        highlights: '1, 2, 3',
        label: 'Record Label',
        uuid: '1234',
        is_new: true
    },
    {
        title: 'Album 2',
        artist: 'Album Artist',
        year: 'YYYY',
        img: '',
        genre: 'Electronic',
        stack: 'RPM',
        review: 'This is a detailed review of the album',
        highlights: '1, 2, 3',
        label: 'Record Label',
        uuid: '1235',
        is_new: true
    }
];

const FilterBar = (props: { newOn: boolean, handleNewButton: Function;}) => {

    return (
    <div class={styles.filterBar}>
      <input
        aria-label="Search"
        class={styles.search}
        placeholder="Search..."
      >
      </input>
      <Select name="stacks" label="Current stack" items={stacks}></Select>
        <button id="newButton" class={props.newOn ? styles.newButtonOn: styles.newButtonOff} onClick={() => props.handleNewButton()}>
            <svg className="w-6 h-6" viewBox="0 0 20 20">
                <path fill={props.newOn ? "white": "black"}
                      d="M6.833 19.708 5.062 16.75l-3.374-.771.333-3.417L-.25 10l2.271-2.562-.333-3.417 3.374-.771L6.833.292 10 1.646 13.167.292l1.771 2.958 3.374.771-.333 3.417L20.25 10l-2.271 2.562.333 3.417-3.374.771-1.771 2.958L10 18.354Zm2.105-6.312 5.354-5.354-1.459-1.396-3.895 3.875-1.75-1.792-1.48 1.459Z"/>
            </svg>
        </button>
    </div>
    )
}

const App = () => {

    const [ newOn, setNewOn ] = useState(false);
    const [ currentUUID, setCurrentUUID ] = useState(0);

    const handleInfo = useCallback( (uuid: number) => {
        setCurrentUUID(prevUUID => prevUUID===uuid ? 0: uuid);
        },
        [],
    );

    const handleNewButton = useCallback( () => {
            console.log("ran")
            setNewOn(prevOn => !prevOn);
        },
        [],
    );

    return (
    <div class={styles.mainContainer}>
      <div class={styles.exploreContainer}>
        <div id="library" class={styles.libraryContainer}>
          <FilterBar newOn={newOn} handleNewButton={handleNewButton}/>
          <Library albums={albums} cUUID={currentUUID} handleInfo={handleInfo}/>
        </div>
        <Info album={albums.filter((album) => { return +album.uuid === currentUUID })[0]} />
      </div>
      <div class={styles.playbackContainer}>
        <NowPlaying />
        <Player />
      </div>
    </div>
    );
}

export default App;
