"use client"
// import { cookies } from 'next/headers'
import {BASE_URL} from './base'
// import { jwtDecode } from "jwt-decode";

export const login = async (data)=>{
    
    const res = await fetch(`${BASE_URL}api/token/`,{
        headers:{
            'Content-Type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(data)
    })

    const body  = await res.json()
    console.log("---body response ",body)
    return body
}


export async function updateSession(request){
    const refreshToken = request.cookies.get('refresh')?.value
    const accessToken = request.cookies.get('access')?.value

}

function isTokenExpired(token) {

    if (!token) return true; // Token is considered expired if it's not present
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now()/1000;
        console.log("e-t",(decoded.exp))
        console.log('c-t',(currentTime))
        console.log(+(decoded.exp) > +(currentTime))
      return  (decoded.exp) < (currentTime);
    } catch (error) {
      console.error('Error decoding token:', error);
      return false; // Token is considered expired if decoding fails
    }
    
  }

 
export async function getSession(){
    // const access = cookies().get("access")?.value
    // if (!access) return null;

    // const decoded = jwtDecode(access);
    // // console.log("refresh token--",decoded)

    // return {access,id:decoded.user_id}
}

export  async function logout(){
    cookies().set("access","")
    cookies().set("refresh","")
}


export  async function updateCookies(access){
    cookies().set("access",access)
}

