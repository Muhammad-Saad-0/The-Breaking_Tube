import React from 'react'
import '../../styles/SideBar.css'
import { SidebarProvider,useSidebarUpdate } from "../../context/Context";

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
import {
  hamburger,
} from "../../assets/Icons/NavIcons";


const SidebarOpen = () => {

  const toggleSidebar = useSidebarUpdate();

  return (
  <SidebarProvider >
      <aside className='open-sidebar'>
       <div className="sidebar-top">
          <button onClick={toggleSidebar}>
            <img src={hamburger} alt="menu" />
          </button>
          <h1>The Breaking Tube</h1>
        </div>
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
  </SidebarProvider>
  )
}

export default SidebarOpen