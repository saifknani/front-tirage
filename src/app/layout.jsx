
'use client'
import { UserContextProvider } from './context/UserContext'
import './globals.css'





const metadata = {
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        /> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      </head>
      <body>
        

        <UserContextProvider>
        {children}
        </UserContextProvider>

      </body>
       
    </html>
  )
}
