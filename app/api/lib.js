"use server"
import { cookies } from 'next/headers'
import {BASE_URL} from './base'
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { serialize } from 'cookie';
import { revalidatePath } from 'next/cache';

export const login = async (data)=>{
    
    const res = await fetch(`${BASE_URL}api/token/`,{
        headers:{
            'Content-Type':'application/json',

        },
        method:'POST',
        body:JSON.stringify({username:data.get("username"),password:data.get('password')})
    })

    const body  = await res.json()
    if (!body)return;
    // console.log("access--",body?.access," refresh--",body?.refresh)
    cookies().set('access',body?.access,{ httpOnly:true})
    cookies().set('refresh',body?.refresh,{ httpOnly:true})


    revalidatePath("/dashboard")
    redirect("/dashboard")
    return body
}


export async function updateSession(request){
    const refreshToken = request.cookies.get('refresh')?.value
    const accessToken = request.cookies.get('access')?.value

    if(!refreshToken)return;
    const decoded = (refreshToken);
    let de = jwtDecode(refreshToken)
    const res = NextResponse.next()

    console.log("---token--status--",isTokenExpired(accessToken))
    if(!isTokenExpired(accessToken)){
        console.log("token status---",isTokenExpired(accessToken))
    }else{
        const ses = await fetch(`${BASE_URL}api/token/refresh/`,{
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + refreshToken 
            },
            method:"POST",
            body:JSON.stringify({refresh:refreshToken})
        })
    
        const {access} = await ses.json()
        
        const cookieOptions = {
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            sameSite: 'strict',
            // Other options as needed
        };

      
        // res.setHeader('Set-Cookie', `access=${access}; ${serialize('access', access, cookieOptions)}`);

        console.log("res---res---",access)
        // res.setHeader('Set-Cookie', `access=${access}; SameSite=Strict; HttpOnly`);

        // response.cookies.set({
        //     name: "tokens",
        //     path: "/",
        //     value: JSON.stringify(tokensResponse),
        //})

        // Object.keys(returnedHeaders).forEach(key =>
            // res.setHeader("access", access),

        // request.cookies['access'] = access;
        request.cookies.delete('access')
        // request.cookies.set('access', access)
           
        //   )
        // res.cookies.set({
            // name:'access',
            // value:access
        // })

        console.log("after",request.cookies.get('access')) 
        return NextResponse.next();

    }
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
    const access = cookies().get("access")?.value
    if (!access) return null;

    const decoded = jwtDecode(access);
    // console.log("refresh token--",decoded)

    return {access,id:decoded.user_id}
}

export  async function logout(){
    cookies().set("access","")
    cookies().set("refresh","")
}


export  async function updateCookies(access){
    cookies().set("access",access)
}

