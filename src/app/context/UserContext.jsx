'use client'
import React from 'react'
import { useState } from 'react'


const UserContext = React.createContext()


function UserContextProvider({ children }) {
  const [activeProfile, setActiveProfile] = useState(null)



  return (
    <UserContext.Provider
      value={{
        activeProfile, 
        setActiveProfile,
    
     
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }