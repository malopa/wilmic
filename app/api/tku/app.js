"use client"
export const create = async (data)=>{
    const res = await fetch(data.url,{
        method:"POST",
        body:JSON.stringify(data)
    })
    const body = await res.json()
    return body
}


export const update = async (data)=>{
    const res = await fetch(data.url,{
        method:"PUT",
        body:JSON.stringify(data)
    })
    const body = await res.json()
    return body
}

export const get = async (data)=>{
    const res = await fetch(data.url)
    const body = await res.json()
    return body
}

export const deleteData = async (data)=>{
    const res = await fetch(data.url,{
        method:"DELETE"
    })
    const body = await res.json()
    return body
}