import React from "react";
import SidebarOpen from "./SidebarOpen";
import SidebarClose from "./SideBarClose";
import { SidebarProvider } from "../../context/SideBarContext";
import { useSidebar} from "../../context/SideBarContext";

const SideBar = () => {
    const sidebarOpen = useSidebar()
   
  return (
    <>
       {sidebarOpen && window.innerWidth >= 620
         ?<SidebarOpen />: <SidebarClose />}
    </>
  );
};

export default SideBar;
