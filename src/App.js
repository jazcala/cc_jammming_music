import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SeachResults from './components/SearchResults';
import Tracklist from './components/Tracklist';
import Spotify from "./util/Spotify";

import { useState, useCallback } from 'react';

// const tracks = [
//   {
//     id: "1",
//     name: "name 1",
//     artist: "artist 1",
//     album: "album 1.1",
//   },
//   {
//     id: "2",
//     name: "name 2",
//     artist: "artist 2",
//     album: "album 2",
//   },
//   {
//     id: "3",
//     name: "name 3",
//     artist: "artist 3",
//     album: "album 3",
//   },
//   {
//     id: "4",
//     name: "name 4",
//     artist: "artist 4",
//     album: "album 4",
//   },
//   {
//     id: "5",
//     name: "name 5",
//     artist: "artist 5",
//     album: "album 5",
//   }
// ]

function App() {


  const [list, setList] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  // const search = () => {
  //   //  get songs
  //   setList(tracks);

  // }

  const search = useCallback((term) => {
    Spotify.search(term).then(setList);
  }, []);

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
        <SeachResults className="search-results" results={list} addPlaylist={addPlaylist} />
        <Tracklist className="track-list" songs={playlist} removeFromPlaylist={removeFromPlaylist} />
      </div>
    </div>
  );
}

export default App;
