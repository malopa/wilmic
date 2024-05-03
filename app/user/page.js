"use client"
import React from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import UserDatatable from '../components/UserDatatable'
import { BASE_URL } from '../api/base'
import { useQuery } from '@tanstack/react-query'
import { useTokenContext } from '../../context/TokenContext'



async function getUser(token) {
  const res = await fetch(`${BASE_URL}api/v1/users/`,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ token
    }
  }  )
 
 
  return await res.json()
}

export default function UserPage() {

  const {token} = useTokenContext()


  const {isLoading,data:users} = useQuery({queryKey:'users',queryFn:async ()=> await getUser(token)})



  return (
    <PageCover>

            <Title title="User Configuration" />
            <Container>

                <UserDatatable users={users?.results} /> 
            </Container>

    </PageCover>
  )
}
