"use client"
import type { AppProps } from 'next/app'
// pages/_app.js
import {SessionContentProvider} from '../context/LoginContext'


export default function App({ Component, pageProps }: AppProps) {
   

  return ( 
    <div>
      <SessionContentProvider >
          <Component {...pageProps} />
      </SessionContentProvider>
    </div>
       )

}