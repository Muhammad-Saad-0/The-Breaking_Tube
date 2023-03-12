import  React , { useState, useContext } from "react";

const SideBarContext = React.createContext();
const SideBarUpdateContext = React.createContext();

export function useSidebar(){
    return useContext(SideBarContext)
}
export function useSidebarUpdate(){
    return useContext(SideBarUpdateContext)
}
export function SidebarProvider({ children }) {
  const [SidebarOpen, setSidebarOpen] = useState(false);

  function toggleOpen() {
    setSidebarOpen(prev => !prev);
    console.log(SidebarOpen);
  }
  return (
    <SideBarContext.Provider value={SidebarOpen}>
      <SideBarUpdateContext.Provider value={toggleOpen}>
        {children}
      </SideBarUpdateContext.Provider>
    </SideBarContext.Provider>
  );
}
