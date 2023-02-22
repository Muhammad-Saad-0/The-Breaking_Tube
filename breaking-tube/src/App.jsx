import React from 'react'
import NavBar from './Components/NavigationBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import { SidebarProvider } from './context/Context'
import Main from './Components/Main/Main'
const App = () => {
  return (
    <>
   <SidebarProvider >

   <NavBar />
    <SideBar />
    <Main />
   </SidebarProvider>
    </>
  )
}

export default App