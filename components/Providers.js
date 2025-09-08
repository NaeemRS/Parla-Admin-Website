// components/ThemeProvider.js
 
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider 
      attribute="class" 
       themes={["pink", "red", "blue", "light", "dark"]}
    >
      {children}
    </ThemeProvider>
  )
}