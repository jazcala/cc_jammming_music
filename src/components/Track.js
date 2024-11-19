import React from 'react';
import './Track.module.css';
import styles from './Track.module.css';


function Track({ track, addRemoveTrack, addPlaylist, removeFromPlaylist }) {

  const handleClick = (e) => {
    e.preventDefault();
    if (addRemoveTrack) {
      addPlaylist(track);
    } else {
      removeFromPlaylist(track)
    }
  }

  return (
    <div className={styles.Track}>
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist}</p>
      </div>
      <button onClick={handleClick}>{addRemoveTrack ? '+' : '-'}</button>
    </div>
  )
}

export default Track;
