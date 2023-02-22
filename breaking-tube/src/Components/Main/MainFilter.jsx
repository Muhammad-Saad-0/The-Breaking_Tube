import React from 'react'
import '../../styles/MainFilter.css'
import Filter from '../../Data/Filter'
import { useSidebar ,useSidebarUpdate } from "../../context/Context";

const MainFilter = () => {
const sidebarOpen = useSidebar()
  return (
    <section className={sidebarOpen?'main-filter-section filter-left':'main-filter-section'}>
      {/* <a href="/">Breaking Bad</a>
      <a href="/">Better Call Saul</a>
      <a href="/">El Camino</a> */}
      {Filter.map(({destination,text,index})=>{
        return (
          <a href={destination} key={index}  >{text}</a>
        )
      })}
    </section>
  )
}

export default MainFilter