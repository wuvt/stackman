import Info from './Info';
import Library from './Library';
import NowPlaying from './NowPlaying';
import Player from './Player';
import Select from './Select';

import styles from './App.module.css';

const stacks = [
  { key: 'ALL', value: 'All Categories' },
  { key: 'RCK', value: 'Rock/Pop' },
  { key: 'RPM', value: 'Electronic' },
];

const FilterBar = () => {
  return (
    <div class={styles.filterBar}>
      <input
        aria-label="Search"
        class={styles.search}
        placeholder="Search..."
      >
      </input>
      <Select name="stacks" label="Current stack" items={stacks}></Select>
    </div>
  )
}

const App = () => {
  return (
    <div class={styles.mainContainer}>
      <div class={styles.exploreContainer}>
        <div id="library" class={styles.libraryContainer}>
          <FilterBar />
          <Library />
        </div>
        <Info />
      </div>
      <div class={styles.playbackContainer}>
        <NowPlaying />
        <Player />
      </div>
    </div>
  );
}

export default App;
