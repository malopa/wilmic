
"use  server"
import { BASE_URL } from "../base"

export const addLoanType = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/loans/`,{
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


export const updateLoan = async (data)=>{
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




export const returnLoan = async (data)=>{

    const res = await fetch(`${BASE_URL}api/v1/return-loan/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })

    const body = await res.text()
    console.log("---body0-----xx----",body)

    return body;
}



export const clientsLoans = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/request-client-loans/?id=${data.id}`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
    })

    const body = await res.json()

    return body;
}

export const clientLoanStatment = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/loan-statement/?id=${data.id}`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
    })

    const body = await res.json()

    return body;
}




export const readLogs = async (token)=>{
    // alert("rrtoekn  -- " + JSON.stringify(token.token))
    const res = await fetch(`${BASE_URL}api/v1/customer-logs/`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ token.token
        },
    })

    const body = await res.json()
    console.log("---report---xxxx---",body)

    return body;
}


export const getLoanType = async (data)=>{
    console.log("---token---",data)
    const res = await fetch(`${BASE_URL}api/v1/loans/`,{
        next: { tags: ['loans'] },
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data
        },
    })

    const body = await res.json()
    console.log("----get--all--data",body)

    return body;
}

export const deleteLoanType = async (data)=>{
    const res = await fetch(`${BASE_URL}api/v1/loans/${data.id}/`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ data.token
        },
    })
    const body = await res.json()

    return body;
}