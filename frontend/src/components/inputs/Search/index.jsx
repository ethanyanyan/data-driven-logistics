import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import * as s from "./search-funcs";
import "./Search.css";

/**
 * Search component, including search bar
 * and search results that expand/collapse
 * on focus/blur with a smooth height
 * animation.
 *
 * @param {string} name - The name attribute for the search bar's input element.
 * @param {string} placeholder - The placeholder text for the search bar.
 * @param {Array} data - The data to be searched.
 * @param {Array} titles - The titles/descriptions of the search results.
 * @param {function} searchFn - The search function to use (default is case-insensitive alphabetical search).
 * @returns {JSX.Element} - The rendered Search component.
 */
function Search({
  name,
  placeholder,
  data = [],
  titles = [],
  searchFn = s.caseInsensitiveAlphabetical,
  value, 
  onChange
}) {
  const [filteredList, setFilteredList] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [firstResHeight, setFirstResHeight] = useState(0);
  const [resHeight, setResHeight] = useState(0);

  useEffect(() => {
    const newFilteredList = searchFn(value, data);
    setFilteredList(newFilteredList);
    if (isFocused) {
      setResHeight(firstResHeight * newFilteredList.length);
    } else {
      setResHeight(0);
    }
  }, [value, data, isFocused, firstResHeight, searchFn]);

  useEffect(() => {
    const results = document.getElementsByClassName("search-results")[0];
    if (results && results.firstElementChild) {
      const h = parseInt(window.getComputedStyle(results.firstElementChild).getPropertyValue("height"));
      setFirstResHeight(h || 0);
    }
  }, [data]);

  const handleFocus = () => {
    setIsFocused(true);
    setResHeight(firstResHeight * filteredList.length);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => setResHeight(0), 200);
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleResultClicked = (resultTxt) => {
    onChange(resultTxt);
    setIsFocused(false);
  };

  return (
    <div id="search-container">
      <div className="search-bar">
        <FaSearch id="search-icon" />
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <SearchResults
        height={resHeight}
        isFocused={isFocused}
        filteredList={filteredList}
        titles={titles}
        handleResultClicked={handleResultClicked}
      />
    </div>
  );
}

function SearchResults({ height, isFocused, filteredList, titles, handleResultClicked }) {
  return (
    <div
      className={`search-results ${isFocused ? "show-results" : ""}`}
      style={{ height: `${height}px` }}
    >
      {filteredList.map((res, idx) => (
        <div
          key={idx}
          className="search-result-item"
          onClick={() => handleResultClicked(res)}
          title={titles[idx] || ""}
        >
          {res}
        </div>
      ))}
    </div>
  );
}

export default Search;