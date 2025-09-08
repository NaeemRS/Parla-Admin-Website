import AppLayout from "@/components/AppLayout";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
       <Head>
          <title>Parla Admin</title>
          <link rel="icon" href="/images/softthrive.svg" />
        </Head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AppLayout>{children}</AppLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}