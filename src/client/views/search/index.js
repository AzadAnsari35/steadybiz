import React from "react";

import SearchBar from "Components/Flights/SearchBar/index";

import "./style.scss";

const Search = () => {
  return (
    <div className="Search">
      <div className="Search-panel">
        <SearchBar />
      </div>
    </div>
  )
};

export default Search;
