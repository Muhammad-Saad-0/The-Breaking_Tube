import  React , { useState, useContext } from "react";

const WatchLaterContext = React.createContext();
const WatchLaterUpdateContext = React.createContext();

export function useWatchLaterList(){
    return useContext(WatchLaterContext)
}
export function useWatchLaterListUpdate(){
    return useContext(WatchLaterUpdateContext)
}
export function WatchLaterListProvider({ children }) {
  const [WatchLaterList, setWatchLaterList] = useState([]);

//   function addWatchLaterList() {
//     setWatchLaterList([WatchLaterList],);
//   }
  return (
    <WatchLaterContext.Provider value={WatchLaterList}>
      <WatchLaterUpdateContext.Provider value={setWatchLaterList}>
        {children}
      </WatchLaterUpdateContext.Provider>
    </WatchLaterContext.Provider>
  );
}