import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ search, searchBy, setSearchBy }) {

  const onChangeSearchBy = (e) => {
    e.preventDefault();
    setSearchBy(e.target.value);
  }

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (searchBy === "") {
      return alert('Please enter a song title');
    }
    search();
  }

  return (
    <div className={styles.searchBar} >
      <input
        type="text"
        placeholder="Enter a song title"
        onChange={onChangeSearchBy}
        value={searchBy}
        data-testid="search-by-input"
      />
      <button className={styles.searchBtn}
        type='button'
        onClick={handleSearchClick}
        data-testid="search-button"
      >Search</button>
    </div>
  );
}

export default SearchBar;
