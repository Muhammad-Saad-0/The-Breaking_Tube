import React from "react";
import NavBar from "./Components/NavigationBar/NavBar";
import SideBar from "./Components/SideBar/SideBar";
import { SidebarProvider } from "./context/SideBarContext";
import Home from "./Components/Main/Home";
import MainFilter from "./Components/Main/HomeFilter";
import Playlist from "./Components/Main/Playlist";
import { VideoIdProvider } from "./context/videoIdContext";
import { VideoTitleProvider } from "./context/videoTitleContext";
import { FilterIdProvider } from "./context/FilterContext";
import { AuthProvider } from "./context/AuthContext";
import { WatchLaterListProvider } from "./context/WatchLaterContext";
import { WatchLaterIdProvider } from "./context/WatchLaterId";
import { CheckLikedProvider } from "./context/LikedContext";
import { ThemeProvider } from "./context/ThemeContext";
const App = () => {
  return (
    <>
    <ThemeProvider>
      <CheckLikedProvider>
        <WatchLaterIdProvider>
          <WatchLaterListProvider>
            <AuthProvider>
              <FilterIdProvider>
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
            </AuthProvider>
          </WatchLaterListProvider>
        </WatchLaterIdProvider>
      </CheckLikedProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
