import  React , { useState, useContext } from "react";

const VideoTitleContext = React.createContext();
const VideoTitleUpdateContext = React.createContext();

export function useVideoTitle(){
    return useContext(VideoTitleContext)
}
export function useVideoTitleUpdate(){
    return useContext(VideoTitleUpdateContext)
}
export function VideoTitleProvider({ children }) {
  const [VideoTitle, setVideoTitle] = useState('');

//   function getVideoId() {
//     setVideoId(prev => !prev);
//     console.log(SidebarOpen);
//   }
  return (
    <VideoTitleContext.Provider value={VideoTitle}>
      <VideoTitleUpdateContext.Provider value={setVideoTitle}>
        {children}
      </VideoTitleUpdateContext.Provider>
    </VideoTitleContext.Provider>
  );
}