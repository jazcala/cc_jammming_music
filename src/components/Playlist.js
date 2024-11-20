import React, { useState } from 'react';
import './Playlist.module.css'
import Tracklist from './Tracklist';
import styles from './Playlist.module.css';

function Playlist({ playlistTracks, removeFromPlaylist, savePlaylist, playlistName, setPlaylistName, addMessage, message }) {
    // const [title, setTitle] = useState("");
    const [trackUris, setTracksUri] = useState([]);

    const addRemoveTrack = false;
    const handlePlaylistName = (e) => {
        e.preventDefault();
        setPlaylistName(e.target.value);
        // If name changes and there was a msg, this clears it since it's going to create a new playlist - no update implemented yet
        addMessage("");
    };

    const handleSubmitSavePlaylist = (e) => {
        e.preventDefault();
        if (playlistName === '') {
            return alert('Add a playlist title');
        }
        if (playlistTracks.length == 0) {
            return alert('Add at least a track to the playlist');
        }
        console.log('en Playlist songs ', playlistTracks);
        const arr = Array.from(playlistTracks, song => song.uri);
        setTracksUri(arr);
        console.log('en playlist trackUris ', trackUris)
        savePlaylist(playlistName, arr);
    }

    return (
        <div className={styles.playlist} id="playlist-section">
            <p id='message'>{message}</p>
            <input
                className={styles.playlistName}
                id="playlist-title"
                onChange={handlePlaylistName}
                value={playlistName}
                type="text"
                placeholder="Add a playlist title" />
            <Tracklist
                tracks={playlistTracks}
                removeFromPlaylist={removeFromPlaylist}
                addRemoveTrack={addRemoveTrack} />
            <button id="save-spotify-btn"
                className={styles.Button}
                type="button"
                onClick={handleSubmitSavePlaylist}>Save to Spotify</button>
        </div>
    )
}

export default Playlist;
