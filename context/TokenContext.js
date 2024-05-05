"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../app/api/lib";
import { redirect } from "next/navigation";

export const TokeContext = createContext()

export const TokeContextProvider = ({children})=>{
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        if(!token){
            // return redirect("/")
        }
    }, [token]);
  
    return <TokeContext.Provider value={{token,setToken}}>
        {children}
    </TokeContext.Provider>
}

export const useTokenContext = ()=>useContext(TokeContext)


