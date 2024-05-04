import { BASE_URL } from "../base"

export const login = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/users`,{
        
    })
    let body = await res.json()
    return body
}


export const addUser = async (data)=>{
    
    const res = await fetch(`${BASE_URL}api/v1/users/`,{
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

export const getGroups = async (token)=>{
    const res = await fetch(`${BASE_URL}api/v1/groups/`,{
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            "Authorization":'Bearer ' + token
        }
    })
    const body = await res.json()
    return body
}

export const deleteUser = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/users/${data.id}/`,{
        method:"DELETE",
        headers:{
            "Content-Type":'application/json',
            "Authorization":'Bearer ' + data.token
        }
    })
    const body = await res.json()
    return body
}


export const updateUser = async (data)=>{
    
    const res = await fetch(`${BASE_URL}api/v1/users/${data.id}`,{
        
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ (data.token)
        },
        body:data
    })

    const body = await res.text()
    console.log("---body0---",body)

    return body;
}