
"use  server"
import { BASE_URL } from "../base"

export const addLoan = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/request-loan/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })

    const body = await res.json()
    console.log("---loan---test----{body--",body)

    return body;
}


export const addAsset = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/asset/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })

    const body = await res.json()
    console.log("---loan---test----{body--",body)

    return body;
}


export const addAttachment = async (data)=>{

    const res = await fetch(`${BASE_URL}api/v1/attachment/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })

    const body = await res.json()
    console.log("---loan---test----{body--",body)

    return body;
}


export const addEmployee = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/employee/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })

    const body = await res.json()
    console.log("---loan---test----{body--",body)

    return body;
}



export const updateLoanType = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/request-loan/${data.id}/`,{
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


export const getCustomerLoan = async (data)=>{
    console.log("---token---",data)
    const res = await fetch(`${BASE_URL}api/v1/request-loan-read/`,{
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data
        },
    })

    const body = await res.json()
    console.log("--people of coloe ---",body)

    return body;
}

export const getLoan = async (data)=>{
    console.log("---token---",data)
    const res = await fetch(`${BASE_URL}api/v1/loans/`,{
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data
        },
    })

    const body = await res.json()
    console.log("--people of coloe ---",body)

    return body;
}

export const deleteLoanType = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/request-loan/${data.id}/`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
    })
    const body = await res.json()

    return body;
}