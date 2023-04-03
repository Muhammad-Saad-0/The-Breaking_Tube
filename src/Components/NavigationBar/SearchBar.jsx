import React from "react";
import SearchLogo from "../../assets/Icons/NavIcons/search.svg";
import Mic from "../../assets/Icons/NavIcons/mic.svg";
const Search = () => {
  return (
    <>
      <article>
        <form onSubmit={()=>{
          return false;
        }}>
          <input type="text" placeholder="Search" onSubmit={()=>{
          return false;
        }} />
          <button
          type="button"
            id="search-btn"
            onClick={(e) => {
              e.preventDefault;
              e.stopPropagation;
              return false
            }}
          >
            <img src={SearchLogo} alt="search" />
          </button>
        </form>
        <button id="mic-btn">
          <img src={Mic} alt="mic" />
        </button>
      </article>
    </>
  );
};

export default Search;
