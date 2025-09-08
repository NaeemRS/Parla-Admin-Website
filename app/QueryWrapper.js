"use client"
import { ThemeProvider } from 'next-themes'
const QueryWrapper = ({ children } ) => (
     <ThemeProvider
      attribute="class"
      themes={["pink", "red", "blue", "light", "dark"]}
    >
       {children}
     
      
    </ThemeProvider>

 )

export default QueryWrapper