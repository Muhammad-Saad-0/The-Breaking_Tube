import  React , { useState, useContext, useEffect } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme(){
    return useContext(ThemeContext)
}
export function useThemeUpdate(){
    return useContext(ThemeUpdateContext)
}
export function ThemeProvider({ children }) {
  const [Theme, setTheme] = useState(false);

  function toggleTheme() {
    setTheme(prev => !prev);
    localStorage.setItem('theme', !Theme)
  }
  useEffect(()=>{
    setTheme(  localStorage.getItem('theme'))
  },[])
  return (
    <ThemeContext.Provider value={Theme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
