import React from 'react'
import styles from './styles.module.scss'
import SearchIcon from '@p/assets/icons/search-icon.svg';

const SearchForm = () => {
    return (
        <form className={styles.searchForm}>
            <label className={styles.searchLabel}>
                <input type="text" className={styles.searchInput} placeholder='Поиск по сайту' />
                <button className={styles.searchButton}><SearchIcon className={styles.searchIcon} /></button>
            </label>
        </form>
    )
}

export default SearchForm;