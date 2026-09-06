//libs
import React from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//assets
import SearchIcon from "@p/assets/icons/search.svg";

interface SearchFormProps {
  className?: string;
}

const SearchForm = ({className}: SearchFormProps) => {
  return (
    <form className={clsx(css.searchForm, className)}>
      <label className={css.searchLabel}>
        <input type="text" className={css.searchInput} placeholder="Поиск по сайту" />
        <button className={css.searchButton}>
          <SearchIcon className={css.searchIcon} />
        </button>
      </label>
    </form>
  );
};

export default SearchForm;
