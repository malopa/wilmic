"use client"
import React, { useRef } from 'react'
import Navigation from '../components/Navigation'
import Header from '../components/Header'
import { useTokenContext } from '../../context/TokenContext'


export default function PageCover(props) {

  const {token} = useTokenContext()

  return (
    <div className="flex">
            <section className="w-[20vw] bg-blue-900 min-h-screen px-4 pt-4 position-fixed">
            <div className='flex items-center text-left font-bold text-white mb-4'> 
            
            <img src='logo.jpg' className='w-[100px] h-[60px] mx-2 rounded-full' alt="image"/>
            T.K.U</div>
             <Navigation />

            </section>
            <section className="w-[80vw]">
                  <Header />
                    {props.children}
              </section>
      </div>
  )
}
