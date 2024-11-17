import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ search }) {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchValue = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      return alert('Please enter a song title');
    }
    search(searchValue);
  }

  return (
    <div className={styles.searchBar} >
      <input
        type="text"
        name="search"
        placeholder="Enter a song title"
        onChange={onChangeSearchValue} />
      <button className={styles.searchBtn}
        type='button'
        onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default SearchBar;
