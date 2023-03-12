import React from "react";
import SidebarOpen from "./SidebarOpen";
import SidebarClose from "./SideBarClose";
import { SidebarProvider } from "../../context/SideBarContext";
import { useSidebar ,useSidebarUpdate } from "../../context/SideBarContext";



const SideBar = () => {
    const sidebarOpen = useSidebar()
  return (
    <>
      {/* <SidebarProvider> */}
       {sidebarOpen?<SidebarOpen />: <SidebarClose />}
       {/* <SidebarOpen /> */}
      {/* </SidebarProvider> */}
    </>
  );
};

export default SideBar;
