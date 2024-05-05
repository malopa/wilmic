"use client"
import React, { useRef } from 'react'
import Navigation from '../components/Navigation'
import Header from '../components/Header'
import { useTokenContext } from '../../context/TokenContext'
import { useRouter } from 'next/navigation'


export default function PageCover(props) {
  const router = useRouter()


  return (
    <div className="flex">
            <section className="w-[16vw] bg-blue-900 min-h-screen px-4 pt-4 position-fixed">
            <div className='flex items-center text-left font-bold text-white mb-4'> 
            
            <img src='logo.jpeg' className='w-[40px] mx-2 rounded-full' alt="image"/>
            wilmic</div>
             <Navigation />

            </section>
            <section className="w-[84vw]">
                  <Header />
                    {props.children}
              </section>
      </div>
  )
}
