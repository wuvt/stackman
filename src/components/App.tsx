import Info from './Info';
import Library from './Library';
import NowPlaying from './NowPlaying';
import Player from './Player';

import styles from './App.module.css';

const FilterBar = () => {
  return (
    <div class={styles.filterBar}>
      <input
        class={styles.search}
        placeholder="Search..."
      >
      </input>
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
