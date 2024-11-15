import React from 'react';
import styles from './SearchResults.module.css';
import Track from './Track';

function SeachResults({ results, addPlaylist }) {
  const addRemoveTrack = true;
  return (<>
    <div className={styles.searchResults}>
      <h2>Results</h2>
      {
        results.map((result) => (
          <Track key={result.id} track={result} addRemoveTrack={addRemoveTrack} addPlaylist={addPlaylist} />
        ))
      }
    </div>
  </>)
}

export default SeachResults;
