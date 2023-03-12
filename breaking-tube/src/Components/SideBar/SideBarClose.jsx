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
import { Link} from 'react-router-dom'

const SideBar = () => {
  return (
    <aside className='close-sidebar'>
      
          <Link to="/"><img src={home} alt="home" />Home</Link>
          <Link to="/playlist"><img src={subscriptions} alt="playlist" />PlayList</Link>
          <Link to="/watchlater"><img src={watchLater} alt="library" />Watch Later</Link>
         
    
    </aside>
  )
}

export default SideBar