"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import Head from "next/head";
import GoogleAnalytics from "./GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Obtiene la ruta actual

  // Verifica si la ruta actual no es null y si comienza con /dashboard/admin
  const shouldHideNavbar = pathname
    ? pathname.startsWith("/dashboard/admin")
    : false;
  const shouldHideNavbar2 = pathname ? pathname.startsWith("/campus-virtual-login") : false;

  
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href="/favicon_io/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
      <GoogleAnalytics />
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          {!shouldHideNavbar && !shouldHideNavbar2 && <Navbar />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
