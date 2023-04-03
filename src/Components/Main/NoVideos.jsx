import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/NoVideos.css'
const NoVideos = () => {
  return (
    <section className='No-videos-section'> 
        <p>No Videos Found</p>
       
            <Link to='/'> <button>Watch Videos
        </button> 

            </Link>
    </section>
  )
}

export default NoVideos