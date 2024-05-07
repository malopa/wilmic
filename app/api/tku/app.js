"use client"
export const create = async (data)=>{
    const res = await fetch(data.url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })
    const body = await res.json()
    console.log("feed back",body)
    return body
}


export const update = async (data)=>{
    const res = await fetch(data.url,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ data.token
        },
        body:JSON.stringify(data)
    })
    const body = await res.json()
    return body
}

export const getData = async (data)=>{
    const res = await fetch(data.url,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ data.token
        },
    })
    const body = await res.json()
    return body
}

export const deleteData = async (data)=>{
    const res = await fetch(data.url,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ data.token
        },
    })
    const body = await res.json()
    return body
}