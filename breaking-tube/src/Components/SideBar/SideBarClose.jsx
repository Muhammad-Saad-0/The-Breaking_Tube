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
const SideBar = () => {
  return (
    <aside className='close-sidebar'>
      
          <a href="/"><img src={home} alt="home" />Home</a>
          <a href="/"><img src={explore} alt="explore" />Explore</a>
          <a href="/"><img src={library} alt="library" />Library</a>
    
    </aside>
  )
}

export default SideBar