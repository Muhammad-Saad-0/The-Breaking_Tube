import  React , { useState, useContext } from "react";

const WatchLaterIdContext = React.createContext();
const WatchLaterIdUpdateContext = React.createContext();

export function useWatchLaterId(){
    return useContext(WatchLaterIdContext)
}
export function useWatchLaterIdUpdate(){
    return useContext(WatchLaterIdUpdateContext)
}
export function WatchLaterIdProvider({ children }) {
  const [WatchLaterId, setWatchLaterId] = useState('');

//   function getWatchLaterIdId() {
//     setWatchLaterIdId(prev => !prev);
//     console.log(SidebarOpen);
//   }
  return (
    <WatchLaterIdContext.Provider value={WatchLaterId}>
      <WatchLaterIdUpdateContext.Provider value={setWatchLaterId}>
        {children}
      </WatchLaterIdUpdateContext.Provider>
    </WatchLaterIdContext.Provider>
  );
}