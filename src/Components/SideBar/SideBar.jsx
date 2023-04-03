import React from "react";
import SidebarOpen from "./SidebarOpen";
import SidebarClose from "./SideBarClose";
import { SidebarProvider } from "../../context/SideBarContext";
import { useSidebar ,useSidebarUpdate } from "../../context/SideBarContext";
import { useMediaQuery } from 'react-responsive'

const SideBar = () => {
    const sidebarOpen = useSidebar()
    const sidebarToggle = useSidebarUpdate() 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 620px)' })
   
    // console.log(sidebarOpen);
  return (
    <>
       {sidebarOpen && window.innerWidth >= 620
         ?<SidebarOpen />: <SidebarClose />}
    </>
  );
};

export default SideBar;
