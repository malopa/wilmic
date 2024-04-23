"use client"
import React, { useRef } from 'react'
import Navigation from '../components/Navigation'
import Header from '../components/Header'
import { TokeContext, TokeContextProvider } from '../../context/TokenContext'


export default function PageCover(props) {
  

  return (
    <div className="flex">
            <section className="w-[20vw] bg-blue-900 min-h-screen px-4 pt-4 position-fixed">
            <div className='flex items-center text-left font-bold text-white mb-4'> 
            
            <img src='logo.jpeg' className='w-[40px] mx-2 rounded-full' alt="image"/>
            tku</div>
             <Navigation />

            </section>
            <section className="w-[80vw]">
                  <Header />
                    {props.children}
              </section>
      </div>
  )
}
