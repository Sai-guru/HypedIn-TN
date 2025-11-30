// /* eslint-disable react/jsx-no-undef */
// 'use client';

// import { ThemeProvider } from '@/context/ThemeContext';
// import './globals.css';
// import { Inter } from 'next/font/google';
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';
// import { usePathname } from 'next/navigation';
// import { AppRouterCacheProvider } from 'next/dist/client/components/app-router-cache-provider';


// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
  
//   // Check if current path is under /adminlogin or /admin
//   const shouldHideHeaderFooter = 
//     pathname?.startsWith('/adminlogin') || 
//     pathname?.startsWith('/admin');

//   return (
//     <html lang="en">
//         <AppRouterCacheProvider>
//       <head>
//         <title>Global Impact Trust - Changing Lives Together</title>
//         <meta
//           name="description"
//           content="Join our mission to create a better world through compassion and action"
//         />
//       </head>
//      <body
//         className={`antialiased ${open_sans.className}`} >
//         <ThemeProvider>
//           {/* Hide Header & Footer for /adminlogin and /admin routes */}
//           {!shouldHideHeaderFooter && <Header />}
//           {children}
//           {!shouldHideHeaderFooter && <Footer />}
//         </ThemeProvider>
//       </body>
//     </AppRouterCacheProvider>
//     </html>
//   );
// }

/* eslint-disable react/jsx-no-undef */
'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const shouldHideHeaderFooter =
    pathname?.startsWith('/adminlogin') ||
    pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <title>Global Impact Trust - Changing Lives Together</title>
        <meta
          name="description"
          content="Join our mission to create a better world through compassion and action"
        />
      </head>

      <body className={`antialiased ${inter.className}`}>
        <ThemeProvider>
          {!shouldHideHeaderFooter && <Header />}
          {children}
          {!shouldHideHeaderFooter && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
