"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import Head from "next/head";
import Footer from "@/components/Footer";

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
  const shouldHideNavbar2 = pathname ? pathname.startsWith("/aula-virtual-login") : false;

  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          {!shouldHideNavbar && !shouldHideNavbar2 && <Navbar />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
