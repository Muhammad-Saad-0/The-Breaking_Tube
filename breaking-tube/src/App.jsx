import React from "react";
import NavBar from "./Components/NavigationBar/NavBar";
import SideBar from "./Components/SideBar/SideBar";
import { SidebarProvider } from "./context/Context";
import Home from "./Components/Main/Home";
import MainFilter from "./Components/Main/HomeFilter";
import Playlist from "./Components/Playlist";
import { VideoIdProvider } from "./context/videoIdContext";
import { VideoTitleProvider } from "./context/videoTitleContext";
import { FilterIdProvider } from "./context/FilterContext";
const App = () => {
  return (
    <>
    <FilterIdProvider >
      <VideoTitleProvider>
        <VideoIdProvider>
          <SidebarProvider>
            <NavBar />
            <SideBar />
            <Home />
          </SidebarProvider>
        </VideoIdProvider>
      </VideoTitleProvider>
      </FilterIdProvider>
    </>
  );
};

export default App;
