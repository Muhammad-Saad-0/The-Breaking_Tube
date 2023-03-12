import React from 'react'
import { useAuth } from '../../context/AuthContext'
import SignUp from './SignUp'
const Playlist = () => {
  const auth = useAuth()
  return (
    <>
    {/* {auth? <p>{`Signed In as ${auth.email}`}</p> : <SignUp /> } */}
 {  auth && <p>{`Signed In as ${auth.email}`}</p>}

    </>
  )
}

export default Playlist