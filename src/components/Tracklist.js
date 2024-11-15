import React, { useState } from 'react';
import Track from './Track';
import styles from './Tracklist.module.css';


function Tracklist({ songsPlaylist, removeFromPlaylist, savePlaylist }) {
  const [title, setTitle] = useState("");
  const [trackUris, setTracksUri] = useState([]);


  const addRemoveTrack = false;
  const handleTitle = (e) => setTitle(e.target.value);

  const handleSubmitSavePlaylist = (e) => {
    e.preventDefault();
    if (title === '') {
      return alert('Add a playlist title');
    }
    if (songsPlaylist.length == 0) {
      return alert('Add at least a track to the playlist');
    }
    setTracksUri(Array.from(songsPlaylist, song => song.uri));
    savePlaylist(title, trackUris);
  }

  return (
    <form className={styles.tracklist} onSubmit={handleSubmitSavePlaylist} id="playlist-section">
      <input
        className={styles.playlistName}
        id="playlist-title"
        onChange={handleTitle} value={title} type="text" placeholder="Add a playlist title" />
      {
        songsPlaylist.map((song) => (
          <Track key={song.id} addRemoveTrack={addRemoveTrack} track={song} removeFromPlaylist={removeFromPlaylist} />
        ))}
      <button id="save-spotify-btn" className={styles.Button} type="Submit">Save to Spotify</button>
    </form>
  )
}

export default Tracklist;
