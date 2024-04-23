import { BASE_URL } from "./base"

export const login  = async (data)=>{
    const res = await fetch(`${BASE_URL}api/token`)
    let body = await res.json()
    console.log(body)
    return body
}