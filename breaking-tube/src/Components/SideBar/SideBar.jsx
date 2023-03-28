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
      {/* <SidebarProvider> */}
       {sidebarOpen
        // && !isTabletOrMobile
         ?<SidebarOpen />: <SidebarClose />}
       {/* <SidebarOpen /> */}
      {/* </SidebarProvider> */}
    </>
  );
};

export default SideBar;
