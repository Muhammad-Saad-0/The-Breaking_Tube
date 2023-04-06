import React from 'react'
import '../../styles/SideBar.css'
import {
    
    history,
    home,
    liked,
    subscriptions,
    watchLater,
} from '../../assets/Icons/SideBarIcons'
import { Link} from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext";


const SideBar = () => {
  const theme = useTheme();

  return (
    <aside className='close-sidebar' id={theme?'light':'dark'}>
      
          <Link to="/"><img src={home} alt="home" />Home</Link>
          <Link to="/playlist"><img src={subscriptions} alt="playlist" />PlayList</Link>
          <Link to="/watchlater"><img src={watchLater} alt="library" />Watch Later</Link>
          <Link to="/history"><img src={history} alt="history" />History</Link>
          <Link to="/liked"><img src={liked} alt="liked" />Liked Videos</Link>
    
    </aside>
  )
}

export default SideBar