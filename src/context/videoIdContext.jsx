import  React , { useState, useContext } from "react";

const VideoContext = React.createContext();
const VideoUpdateContext = React.createContext();

export function useVideoId(){
    return useContext(VideoContext)
}
export function useVideoIdUpdate(){
    return useContext(VideoUpdateContext)
}
export function VideoIdProvider({ children }) {
  const [VideoId, setVideoId] = useState('');

//   function getVideoId() {
//     setVideoId(prev => !prev);
//     console.log(SidebarOpen);
//   }
  return (
    <VideoContext.Provider value={VideoId}>
      <VideoUpdateContext.Provider value={setVideoId}>
        {children}
      </VideoUpdateContext.Provider>
    </VideoContext.Provider>
  );
}