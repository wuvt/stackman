import Info from './Info';
import Library from './Library';
import NowPlaying from './NowPlaying';
import Player from './Player';

import styles from './App.module.css';

const App = () => {
  return (
    <div class={styles.mainContainer}>
      <div class={styles.exploreContainer}>
        <Library />
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
