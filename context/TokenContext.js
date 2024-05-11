"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../app/api/lib";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const TokeContext = createContext()

export const TokeContextProvider = ({children})=>{
    const [token, setToken] = useState(null);
    const [user_id, serUserId] = useState(null);
    const [name, setFname] = useState(null);
    
    useEffect(() => {
        if(token){
            const decoded = jwtDecode(token);
            serUserId(decoded.user_id)
        }
    }, [token]);
  
    return <TokeContext.Provider value={{token,user_id,name,setFname,setToken}}>
        {children}
    </TokeContext.Provider>
}

export const useTokenContext = ()=>useContext(TokeContext)


