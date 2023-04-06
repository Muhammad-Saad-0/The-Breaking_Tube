import React from 'react'
import '../../styles/SideBar.css'
import { SidebarProvider,useSidebarUpdate } from "../../context/SideBarContext";
import {Link} from 'react-router-dom'
import {
    history,
    home,
    liked,
    subscriptions,
    watchLater,
} from '../../assets/Icons/SideBarIcons'
import {
  hamburger,
} from "../../assets/Icons/NavIcons";
import { useTheme } from "../../context/ThemeContext";


const SidebarOpen = () => {

  const theme = useTheme();
  const toggleSidebar = useSidebarUpdate();

  return (
      <aside className='open-sidebar'  id={theme?'light':'dark'}>
         <div className="open-sidebar-top">
          <button onClick={toggleSidebar}>
            <img src={hamburger} alt="menu" />
          </button>
         <Link to={'/'} style={{ textDecoration: 'none' }}>
         <h1>The Breaking Tube</h1>
         </Link>
        </div>
    <section>
    <Link to="/"><img src={home} alt="home" />Home</Link>
          <Link to="/playlist"><img src={subscriptions} alt="playlist" />PlayList</Link>
          <Link to="/watchlater"><img src={watchLater} alt="watchlater" />Watch Later</Link>
    </section>
    <section>
          <Link to="/history"><img src={history} alt="history" />History</Link>
          <Link to="/liked"><img src={liked} alt="liked" />Liked Videos</Link>
    </section>
    </aside>
  )
}

export default SidebarOpen