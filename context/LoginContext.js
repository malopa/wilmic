"use client"
import { createContext, useContext, useState } from "react"

// import { createContext } from "react";

export const SessionContext = createContext()

export const SessionContentProvider = ({children})=>{
    const [login,setLogin] = useState(false)
    return <SessionContext.Provider value={login}>
        {children}
    </SessionContext.Provider>
}

export const useLoginSession = ()=>useContext(SessionContext)