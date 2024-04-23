
"use  server"
import { BASE_URL } from "../base"

export const addCustomer = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/customers/`,{
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


export const updateCustomer = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/customers/${data.id}/`,{
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


export const getCustomer = async (data)=>{
    
    const res = await fetch(`${BASE_URL}api/v1/customers/`,{
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data
        },
    })

    const body = await res.json()
    console.log("----get--all--data",body)

    return body;
}

export const deleteCustomers = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/customers/${data.id}/`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
    })
    const body = await res.json()

    return body;
}