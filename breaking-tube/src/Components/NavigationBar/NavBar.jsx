import React from "react";
import SearchBar from "./SearchBar";
import {
  apps,
  create,
  hamburger,
  notifications,
} from "../../assets/Icons/NavIcons";
import profilepic from "../../assets/Icons/Profile/heisenberg.jpg";
import "../../styles/Navbar.css";
import { SidebarProvider } from "../../context/SideBarContext";
import { useSidebarUpdate} from "../../context/SideBarContext";
import {Link} from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {

const auth = useAuth()

  const toggleSidebar = useSidebarUpdate();
  return (
    <SidebarProvider>
      <nav>
        <div className="nav-left">
          <button onClick={toggleSidebar}>
            <img src={hamburger} alt="menu" />
          </button>
         <Link to={'/'} style={{ textDecoration: 'none' }}>
         <h1>The Breaking Tube</h1>
         </Link>
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
          <Link to={'/profile'}>
            <button>
            <img src={profilepic} alt="profile" className="user-pfp" />
            </button>
            
          </Link>
        </div>
      </nav>
    </SidebarProvider>
  );
};

export default NavBar;
