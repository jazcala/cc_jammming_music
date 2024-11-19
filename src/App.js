import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SeachResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Spotify from "./util/Spotify";

import { useState, useCallback } from 'react';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  // const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlist, setPlaylist] = useState([]);

  // Spotify Calls
  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const savePlaylist = useCallback(async (title, trackUris) => {

    try {
      // console.log("trackUris ", trackUris);
      const response = await Spotify.savePlaylist(title, trackUris);
      console.log('response save playlist', response)
      if (response === 201) {
        clearPlaylist()
        addCreatedPlaylistMessage()
      }

    } catch (e) {
      console.log('savePlaylist Error catched: ', e)
    }
  }, []);

  // Other functions
  const clearPlaylist = () => {
    // setPlaylistTitle("");

    console.log('In Clean Playlist');
    setPlaylist([]);
    // TODO clean title
  }

  const addCreatedPlaylistMessage = () => {
    const playlist = document.getElementById('playlistContent');
    playlist.style.display = 'none';
    const message = document.createElement('p');
    const text = document.createTextNode('Playlist created');
    message.appendChild(text);
    playlist.parentElement.appendChild(message);
  }

  const addPlaylist = (track) => {
    let result = playlist.find(elem => elem.id === track.id);
    if (!result) {
      setPlaylist((prev) => [...prev, track]);
    } else {
      alert('This song is in the playlist.')
    }

  };

  const removeFromPlaylist = (trackToRemove) => {
    setPlaylist((prevTracks) => prevTracks.filter((track) => track.id !== trackToRemove.id));
  }

  return (
    <div className="app">
      <Header />
      <SearchBar search={search} />
      <div className='container'>
        <SeachResults className="search-results" results={searchResults} addPlaylist={addPlaylist} />
        <Playlist className="track-list"
          songsPlaylist={playlist}
          removeFromPlaylist={removeFromPlaylist}
          savePlaylist={savePlaylist} />
      </div>
    </div>
  );
}

export default App;
