import React from 'react'
import '../../styles/SideBar.css'
import { useSidebar ,useSidebarUpdate } from "../../context/Context";

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

const SidebarOpen = () => {
  const sidebarOpen = useSidebar()
  return (
    <aside className='open-sidebar'>
    <section>
    <a href="/"><img src={home} alt="home" />Home</a>
          <a href="/"><img src={explore} alt="explore" />Explore</a>
          <a href="/"><img src={library} alt="library" />Library</a>
    </section>
    <section>
          <a href="/"><img src={history} alt="history" />History</a>
          <a href="/"><img src={watchLater} alt="watchLater" />Watch Later</a>
          <a href="/"><img src={liked} alt="liked" />Liked Videos</a>
    </section>
    </aside>
  )
}

export default SidebarOpen