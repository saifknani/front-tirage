'use client';
import { useEffect, useState,useContext } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { UserContextProvider } from '../context/UserContext';
// export const metadata = {
//   title: 'Trussdid Dashboard',

// }
import { UserContext } from '../context/UserContext';

export default function CredsLayout({ children }) {
  const {fetchWinner}=useContext(UserContext)
  useEffect(()=>{
  fetchWinner()
  },[])
  const [open, setOpen] = useState(false);
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="w-full flex justify-normal">
  
            
          <SideBar open={open} setOpen={setOpen} />
          
          <div className="flex w-full flex-col items-center overflow-hidden  h-[100vh]">
            <Navbar open={open} setOpen={setOpen} />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
