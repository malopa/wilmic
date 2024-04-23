"use server"


import { revalidatePath } from 'next/cache'
import { z } from 'zod'
 
const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
})

export async function createUser(formData){
    let data = {
        first_name:formData.get("first_name"),
        last_name:formData.get("last_name"),
        email:formData.get("email"),
        phone_number:formData.get("phone_number"),
        password:formData.get("password"),
    }
    let token  = formData.get('token')
    const res = await fetch(`${BASE_URL}user/`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            'Authorization':'Bearer ' + token 
        }
    })


    const body = await res.json()

    return body;
}



export async function updateUser(formData,userId){
    let data = {
        first_name:formData.get("first_name"),
        last_name:formData.get("last_name"),
        phone_number:formData.get("phone_number"),
        password:formData.get("password"),
    }
    let token  = formData.get('token')
    const res = await fetch(`${BASE_URL}user/${userId}`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            'Authorization':'Bearer ' + token 
        }
    })


    const body = await res.json()

    return body;
}


export async function createCustomer(formData){
    let data = {
        first_name:formData.get("first_name"),
        last_name:formData.get("last_name"),
        phone_number:formData.get("phone_number"),
        password:formData.get("password"),
    }
    let token  = formData.get('token')
    const res = await fetch(`${BASE_URL}user/`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            'Authorization':'Bearer ' + token 
        }
    })


    const body = await res.json()

    return body;
}

export async function updateCustomer(formData,customerId){
    let data = {
        first_name:formData.get("first_name"),
        last_name:formData.get("last_name"),
        phone_number:formData.get("phone_number"),
        password:formData.get("password"),
    }
    let token  = formData.get('token')
    const res = await fetch(`${BASE_URL}customer/${customerId}`,{
        method:"PUT",
        headers:{
            'Content-Type':"application/json",
            'Authorization':'Bearer ' + token 
        }
    })


    const body = await res.json()

    return body;
}