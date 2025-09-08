
// ThemeContext.js
'use client'
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null); // ❌ not "light" initially

  // Load theme from localStorage before first paint
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark"); 
  }, []);

  // Update theme in localStorage + <html> class
  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      return nextTheme;
    });
  };

  // Prevent UI flicker until theme is known
  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      
        {children}
    </ThemeContext.Provider>
  );
};
