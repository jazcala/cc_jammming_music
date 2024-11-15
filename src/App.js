import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SeachResults from './components/SearchResults';
import Tracklist from './components/Tracklist';
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

  const savePlaylist = useCallback((title, trackUris) => {

    try {
      Spotify.savePlaylist(title, trackUris).then(clearPlaylist);
    } catch (e) {
      console.log('savePlaylist Error catched: ', e)
    }
  }, []);

  // Other functions
  const clearPlaylist = () => {
    // setPlaylistTitle("");
    setPlaylist([]);
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
        <Tracklist className="track-list"
          songsPlaylist={playlist}
          removeFromPlaylist={removeFromPlaylist}
          savePlaylist={savePlaylist} />
      </div>
    </div>
  );
}

export default App;
