import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
  create,
  hamburger,
  notifications,
} from "../../assets/Icons/NavIcons";
import profilepic from "../../assets/Icons/Profile/heisenberg.jpg";
import "../../styles/Navbar.css";
import { SidebarProvider } from "../../context/SideBarContext";
import { useSidebarUpdate } from "../../context/SideBarContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CgProfile } from "react-icons/cg";
import { IoMoonSharp, IoSunny } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import SearchLogo from "../../assets/Icons/NavIcons/search.svg";
import { useThemeUpdate } from "../../context/ThemeContext";
const NavBar = () => {
  const auth = useAuth();

  const toggleSidebar = useSidebarUpdate();
  const toggleTheme = useThemeUpdate();
  const theme = useTheme();

  return (
    <SidebarProvider>
      <nav id={theme ? "light" : "dark"}>
        <div className="nav-left">
          <button onClick={toggleSidebar} name="toggle sidebar">
            <img src={hamburger} alt="menu" />
          </button>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <h1>The Breaking Tube</h1>
          </Link>
        </div>
        <div className="nav-mid">
          <SearchBar />
        </div>
        <div className="nav-right">
          <button id="search-btn-right"  name="search">
            <img src={SearchLogo} alt="search" />
          </button>
          <button name="create">
            <img src={create} alt="create"  />
          </button>
          <button
            className="theme-toggle"
            onClick={() => {
              toggleTheme(!theme);
            }}
            name="toggle theme"
          >
            {theme ? <IoSunny /> : <IoMoonSharp />}
          </button>
          <button name="notifications">
            <img src={notifications} alt="notifications" />
          </button>
          <Link to={"/profile"}>
            <button name="profile">
              {auth ? (
                <img src={profilepic} alt="profile" className="user-pfp" />
              ) : (
                <CgProfile className="profile-icon" />
              )}
            </button>
          </Link>
        </div>
      </nav>
    </SidebarProvider>
  );
};

export default NavBar;
