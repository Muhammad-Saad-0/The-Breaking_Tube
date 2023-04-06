import React from "react";
import "../../styles/MainFilter.css";
import Filter from "../../Data/Filter";
import { useSidebar, } from "../../context/SideBarContext";
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
      {Filter.map(({ destination, text, index, category }) => {
        return (
          <a
          tabIndex="1"
            key={index}
            onClick={() => {
              setFIlterId(category);
              
            }}
          >
            {text}
          </a>
        );
      })}
    </section>
  );
};

export default MainFilter;
