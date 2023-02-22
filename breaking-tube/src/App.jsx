import React from 'react'
import NavBar from './Components/NavigationBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import { SidebarProvider } from './context/Context'
const App = () => {
  return (
    <>
   <SidebarProvider >
   <NavBar />
    <SideBar />
   </SidebarProvider>
    </>
  )
}

export default App