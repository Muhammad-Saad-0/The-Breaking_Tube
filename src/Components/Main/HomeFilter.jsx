import React from "react";
import "../../styles/MainFilter.css";
import Filter from "../../Data/Filter";
import { useSidebar, useSidebarUpdate } from "../../context/SideBarContext";
import { Link } from "react-router-dom";
import { useFilterIdUpdate } from "../../context/FilterContext";
import { useTheme } from "../../context/ThemeContext";

const MainFilter = () => {
  const setFIlterId = useFilterIdUpdate();
  const theme = useTheme();
  const sidebarOpen = useSidebar();
  return (
    <section
      className={
        sidebarOpen ? "main-filter-section filter-left" : "main-filter-section"
      }
      id={theme?'light':'dark'} >
      {/* <a href="/">Breaking Bad</a>
      <a href="/">Better Call Saul</a>
      <a href="/">El Camino</a> */}
      {Filter.map(({ destination, text, index, category }) => {
        return (
          // <Link to={destination} key={index} onClick={()=>{setFIlterId(category)}} >{text}</Link>
          <a
          tabIndex="1"
            key={index}
            onClick={() => {
              setFIlterId(category);
              
            }}
          >
            {text}
          </a>
          // <Link to={`/${category}`} key={index} onClick={()=>{setFIlterId(category)}} >{text}</Link>
        );
      })}
    </section>
  );
};

export default MainFilter;