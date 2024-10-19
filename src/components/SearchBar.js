import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar(props) {

    const onClick = (e) => {
        e.preventDefault();
        props.search();

    }
    return (
        <div className={styles.searchBar}>
            <input type="text" name="search" />
            <button className={styles.searchBtn} onClick={onClick}>Search</button>
        </div>
    );
}

export default SearchBar;
