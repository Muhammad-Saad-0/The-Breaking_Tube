import  React , { useState, useContext } from "react";

const FilterContext = React.createContext();
const FilterUpdateContext = React.createContext();

export function useFilterId(){
    return useContext(FilterContext)
}
export function useFilterIdUpdate(){
    return useContext(FilterUpdateContext)
}
export function FilterIdProvider({ children }) {
  const [FilterId, setFilterId] = useState('');

//   function getFilterId() {
//     setFilterId(prev => !prev);
//     console.log(SidebarOpen);
//   }
  return (
    <FilterContext.Provider value={FilterId}>
      <FilterUpdateContext.Provider value={setFilterId}>
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  );
}