import React from 'react'
import NavBar from './Components/NavigationBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import { SidebarProvider } from './context/Context'
import Home from './Components/Main/Home'
import MainFilter from "./Components/Main/HomeFilter";
import Playlist from './Components/Playlist'

const App = () => {
 
  return (
    <>
   <SidebarProvider >
   <NavBar />
    <SideBar />
    <Home />

   </SidebarProvider>
    </>
  )
}

export default App