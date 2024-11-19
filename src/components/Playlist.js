import React, { useState } from 'react';
import './Playlist.module.css'
import Tracklist from './Tracklist';
import styles from './Playlist.module.css';

function Playlist({ songsPlaylist, removeFromPlaylist, savePlaylist }) {
    const [title, setTitle] = useState("");
    const [trackUris, setTracksUri] = useState([]);

    const addRemoveTrack = false;
    const handleTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
    };

    const handleSubmitSavePlaylist = (e) => {
        e.preventDefault();
        if (title === '') {
            return alert('Add a playlist title');
        }
        if (songsPlaylist.length == 0) {
            return alert('Add at least a track to the playlist');
        }
        console.log('en Playlist songs ', songsPlaylist);
        const arr = Array.from(songsPlaylist, song => song.uri);
        // console.log(arr);
        setTracksUri(arr);
        console.log('en playlist trackUris ', trackUris)
        savePlaylist(title, arr);
    }

    return (<>
        <div className={styles.tracklist} id="playlist-section">
            <input
                className={styles.playlistName}
                id="playlist-title"
                onChange={handleTitle} value={title} type="text" placeholder="Add a playlist title" />
            <Tracklist songsPlaylist={songsPlaylist} removeFromPlaylist={removeFromPlaylist} addRemoveTrack={addRemoveTrack} />
            <button id="save-spotify-btn"
                className={styles.Button}
                type="button"
                onClick={handleSubmitSavePlaylist}>Save to Spotify</button>
        </div>
    </>)
}

export default Playlist;
