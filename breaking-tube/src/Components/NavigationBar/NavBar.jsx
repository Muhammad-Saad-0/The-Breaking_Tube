import React from "react";
import SearchBar from "./SearchBar";
import {
  apps,
  create,
  hamburger,
  leftBottom,
  notifications,
} from "../../assets/Icons/NavIcons";
import profilepic from "../../assets/Icons/Profile/User-Avatar.svg";
import '../../styles/Navbar.css'

const NavBar = () => {
  return (
    <nav>
      <div className="nav-left">
        <button>
          <img src={hamburger} alt="menu" />
        </button>
        <h1>The Breaking Tube</h1>
      </div>
      <div className="nav-mid">
        <SearchBar />
      </div>
      <div className="nav-right">
        <button>
          <img src={create} alt="create" />
        </button>
        <button>
          <img src={apps} alt="apps" />
        </button>
        <button>
          <img src={notifications} alt="notifications" />
        </button>
        <button>
          <img src={profilepic} alt="profile" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
