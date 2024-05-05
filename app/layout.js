import { Poppins } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css'
// import "primereact/resources/themes/lara-light-indigo/theme.css";

// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import 'primereact/resources/themes/saga-blue/theme.css';

import 'primereact/resources/primereact.min.css';
// import 'primereact/resources/themes/mdc-light-indigo/theme.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";





import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider";
import {TokeContextProvider} from '../context/TokenContext'

// Create a client


const inter = Poppins({ subsets: ["latin"],weight:'400' });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const value = {
    inputStyle: 'filled',
}

  return (
    <ReactQueryClientProvider>
            <PrimeReactProvider value={value}>
              

          <html lang="en">
            <head>
            <link rel="icon" type="image/jpeg" href="logo.jpeg" />
              <title>wilmic</title>

            
              <script
          dangerouslySetInnerHTML={{
            __html: `
              const style = document.createElement('style')
              style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
              style.setAttribute('type', 'text/css')
              document.querySelector('head').prepend(style)
            `,
          }}
        />

            </head>
            <body className={inter.className}>
              <TokeContextProvider>
                {children}  
              </TokeContextProvider>
            </body>
          </html>

          </PrimeReactProvider>

    </ReactQueryClientProvider>
    
  );
}
