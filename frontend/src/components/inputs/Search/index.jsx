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
}) {
  const [filteredList, setFilteredList] = useState(data);
  const [isFocused, setIsFocused] = useState(false);
  const [firstResHeight, setFirstResHeight] = useState(0);
  const [resHeight, setResHeight] = useState(0);
  const [value, setValue] = useState("");

  // On component render, get the height of the first search result
  // to use as a basis for animating the height of the search results
  useEffect(() => {
    const results = document.getElementsByClassName("search-results")[0];
    if (results) {
      const firstRes = results.firstElementChild;
      if (firstRes) {
        const h = parseInt(
          window.getComputedStyle(firstRes).getPropertyValue("height")
        );
        setFirstResHeight(h);
      }
    }
  }, []);

  // Whenever the input value changes or when the data changes,
  // filter the data and update the height of the search results
  useEffect(() => {
    const newFilteredList = searchFn(value, data);
    setFilteredList(newFilteredList);
    if (isFocused) {
      setResHeight(firstResHeight * newFilteredList.length);
    } else {
      setResHeight(0);
    }
  }, [value, data]);

  function handleFocus() {
    setIsFocused(true);
    setResHeight(firstResHeight * filteredList.length);
  }

  function handleBlur() {
    setIsFocused(false);
    setResHeight(0);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleResultClicked(resultTxt) {
    setValue(resultTxt);
  }

  return (
    <div id="search-container">
      <div className="search-bar">
        <FaSearch id="search-icon" />
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={(e) => handleChange(e)}
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
        name={name}
        handleResultClicked={handleResultClicked}
      />
    </div>
  );
}

/**
 * Component responsible for displaying search results under the search bar.
 * Provides scrollable and clickable results.
 * Separated into its own component to leverage height changes in the Search component
 * to nicely trigger re-renders of the SearchResults component.
 *
 * @param {number} [height=0] - The height of the search results component.
 * @param {boolean} isFocused - Indicates whether the search bar is currently focused.
 * @param {Array} filteredList - The list of filtered search results.
 * @param {string} name - The name attribute of the search bar's input element.
 * @param {Array} titles - The titles of the search results, shown when hovering over the result.
 * @param {function} handleResultClicked - Function to run when result is clicked
 * @returns {JSX.Element} - The rendered SearchResults component.
 */
function SearchResults({
  height = 0,
  isFocused,
  filteredList,
  name,
  titles,
  handleResultClicked,
}) {
  return (
    <div
      className={`search-results ${isFocused ? "show-results" : ""}`}
      style={{ height: height }}
    >
      {filteredList.map((res, idx) => (
        <div
          key={`result-${idx}`}
          onClick={() => handleResultClicked(res)}
          title={titles ? titles[idx] : ""}
        >
          {res}
        </div>
      ))}
    </div>
  );
}

export default Search;
