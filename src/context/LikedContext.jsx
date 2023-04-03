import  React , { useState, useContext } from "react";

const CheckLikedContext = React.createContext();
const CheckLikedUpdateContext = React.createContext();

export function useCheckLiked(){
    return useContext(CheckLikedContext)
}
export function useCheckLikedUpdate(){
    return useContext(CheckLikedUpdateContext)
}
export function CheckLikedProvider({ children }) {
  const [CheckLiked, setCheckLiked] = useState(false);

//   function getCheckLikedId() {
//     setCheckLikedId(prev => !prev);
//     console.log(SidebarOpen);
//   }
  return (
    <CheckLikedContext.Provider value={CheckLiked}>
      <CheckLikedUpdateContext.Provider value={setCheckLiked}>
        {children}
      </CheckLikedUpdateContext.Provider>
    </CheckLikedContext.Provider>
  );
}