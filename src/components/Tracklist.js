import React, { useState } from 'react';
import Track from './Track';
import styles from './Tracklist.module.css';


function Tracklist(props) {
  const results = props.songs;
  const addRemoveTrack = false;
  const removeFromPlaylist = props.removeFromPlaylist;
  const [name, setName] = useState("");
  const handleName = (e) => setName(e.target.value);



  return (
    <div className={styles.tracklist}>
      <input
        className={styles.playlistName}
        onChange={handleName} value={name} type="text" placeholder="Add a playlist title" />
      {
        results.map((result) => (
          <Track key={result.id} addRemoveTrack={addRemoveTrack} track={result} removeFromPlaylist={removeFromPlaylist} />
        ))}
      <button className={styles.Button}>Save to Spotify</button>
    </div>

  )
};

export default Tracklist;