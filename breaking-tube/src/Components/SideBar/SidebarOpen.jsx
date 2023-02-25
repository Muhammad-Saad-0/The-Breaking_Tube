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
    <section>
    <a href="/"><img src={home} alt="home" />Home</a>
          <a href="/"><img src={subscriptions} alt="playlist" />PlayList</a>
          <a href="/"><img src={watchLater} alt="watchlater" />Watch Later</a>
    </section>
    <section>
          <a href="/"><img src={history} alt="history" />History</a>
          <a href="/"><img src={liked} alt="liked" />Liked Videos</a>
          <a href="/"><img src={library} alt="library" />Library</a>
    </section>
    </aside>
  </SidebarProvider>
  )
}

export default SidebarOpen