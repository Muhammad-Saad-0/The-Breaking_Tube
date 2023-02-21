import React from 'react'
import SearchLogo from '../../assets/Icons/NavIcons/search.svg'
import Mic from '../../assets/Icons/NavIcons/mic.svg'
const Search = () => {
  return (
   <>
   <article>
   <form>
    <input type="text" placeholder='Search' />
    <button id='search-btn'><img src={SearchLogo} alt="search" /></button>
   </form>
   <button id='mic-btn'><img src={Mic} alt="mic" /></button>
   </article>
   </>
  )
}

export default Search