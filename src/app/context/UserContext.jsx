'use client'
import React from 'react'
import { useState } from 'react'
import { getWinner } from '../api/player'

const UserContext = React.createContext()


function UserContextProvider({ children }) {
  const [activeProfile, setActiveProfile] = useState(null)
  const [winnerPlayer,setWinnerPlayer]=useState(null)

 const  fetchWinner=async()=>{
 const resp=await getWinner()
 console.log(resp)
if (resp.message){

  console.log(resp.message)
}else{
  setWinnerPlayer(resp)
}
 }

  return (
    <UserContext.Provider
      value={{
        activeProfile, 
        setActiveProfile,
        winnerPlayer,
        setWinnerPlayer,
        fetchWinner
    
     
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }