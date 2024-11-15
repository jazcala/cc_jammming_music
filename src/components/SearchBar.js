import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ search }) {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchValue = ({ target }) => {
    setSearchValue(target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      return alert('Please enter a song title');
    }
    search(searchValue);
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Enter a song title"
        onChange={onChangeSearchValue} />
      <button className={styles.searchBtn} type='submit'>Search</button>
    </form>
  );
}

export default SearchBar;
