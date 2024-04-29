import React, { useState } from 'react'



export default function Test() {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')


    const login = async ()=>{
        // let formData = new FormData()
        // formData.append("username",username)
        // formData.append("password",password)

        let data = {username:username,password:password}
        const res = await fetch('url',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        })

        const body = await res.json()
            
        return body
    }
    
  return (
    <div>

        <input name="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input name="username" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={login}></button>
    </div>
  )
}
