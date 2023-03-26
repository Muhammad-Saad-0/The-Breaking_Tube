import React from 'react'
import '../../styles/SideBar.css'
import {
    arrowBottom,
    explore,
    feedback,
    gaming,
    help,
    history,
    home,
    library,
    liked,
    live,
    play,
    premium,
    queue,
    report,
    settings,
    subscriptions,
    watchLater,
    yourVideos
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
         
    
    </aside>
  )
}

export default SideBar