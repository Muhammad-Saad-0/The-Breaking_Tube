import React from "react";
import SidebarOpen from "./SidebarOpen";
import SidebarClose from "./SideBarClose";
import { SidebarProvider } from "../../context/Context";
import { useSidebar ,useSidebarUpdate } from "../../context/Context";



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
