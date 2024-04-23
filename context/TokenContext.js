"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../app/api/lib";

export const TokeContext = createContext()

export const TokeContextProvider = ({children})=>{
    const [token, setToken] = useState(null);
    
    useEffect(() => {

    async function getToken(){
        let to = await getSession()
        setToken(to?.access)
    }

    getToken()
    }, []);
  
    return <TokeContext.Provider value={{token,setToken}}>
        {children}
    </TokeContext.Provider>
}

export const useTokenContext = ()=>useContext(TokeContext)


