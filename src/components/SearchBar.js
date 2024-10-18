import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
    return (
        <div className={styles.searchBar}>
            <input type="text" name="search" />
            <button className={styles.searchBtn}>Search</button>
        </div>
    );
}

export default SearchBar;
