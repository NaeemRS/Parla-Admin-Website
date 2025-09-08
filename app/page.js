"use client";
import { useState, useEffect } from "react";
import LoginForm from "./auth/login";
import Loader from "@/components/Loader";
 
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate a short delay for loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <Loader /> : <LoginForm />}
    </>
  );
}
 