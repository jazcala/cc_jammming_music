import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SeachResults from './components/SearchResults';
import Tracklist from './components/Tracklist';

import { useState } from 'react';

const tacks = [
  {
    id: "1",
    name: "name 1",
    artist: "artist 1",
    album: "album 1.1",
  },
  {
    id: "2",
    name: "name 2",
    artist: "artist 2",
    album: "album 2",
  },
  {
    id: "3",
    name: "name 3",
    artist: "artist 3",
    album: "album 3",
  },
  {
    id: "4",
    name: "name 4",
    artist: "artist 4",
    album: "album 4",
  },
  {
    id: "5",
    name: "name 5",
    artist: "artist 5",
    album: "album 5",
  }
]

function App() {


  const [list, setList] = useState(tacks);
  const [playlist, setPlaylist] = useState([]);



  return (
    <div className="app">
      <Header />
      <SearchBar />
      <div className='container'>
        <SeachResults className="search-results" results={list} />
        <Tracklist className="track-list" songs={playlist}/>
      </div>
    </div>
  );
}

export default App;
