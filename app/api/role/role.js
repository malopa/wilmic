
"use  server"
import { BASE_URL } from "../base"

export const addRole = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/roles/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })

    const body = await res.json()
    console.log("---body0---",body)

    return body;
}


export const updateRole = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/roles/${data.id}/`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })

    const body = await res.json()
    console.log("---body0---",body)

    return body;
}


export const getRoles = async (data)=>{
    console.log("---token---",data)
    const res = await fetch(`${BASE_URL}api/v1/roles/`,{
        next: { tags: ['loans'] },
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data
        },
    })

    const body = await res.json()

    return body;
}

export const deleteRole = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/roles/${data.id}/`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
    })
    const body = await res.json()

    return body;
}