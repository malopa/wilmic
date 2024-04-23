import React from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import UserDatatable from '../components/UserDatatable'
import { BASE_URL } from '../api/base'
import { getSession } from '../api/lib'
import { redirect } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'



async function getUser(token) {
  const res = await fetch(`${BASE_URL}api/v1/users/`,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ token
    }
  }  )
 
 
  return await res.json()
}

export default async function page() {

  const token = await getSession()

  if(!token?.access){
    return redirect("/")
  }

  const users = await getUser(token.access)



  return (
    <PageCover>

            <Title title="User Configuration" />
            <Container>
                <UserDatatable product={users} /> 
            </Container>

    </PageCover>
  )
}
