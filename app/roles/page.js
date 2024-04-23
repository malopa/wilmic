"use client"
import React, { useEffect } from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import RoleDataTable from '../components/RoleDataTable'
import { useTokenContext } from '../../context/TokenContext'
import { getRoles } from '../api/role/role'

export default function page() {
  const {token} = useTokenContext()
  const [roles,setRoles] = React.useState([])

  useEffect(()=>{
    getRoles(token)
    .then(res=>setRoles(res.results))
  },[])

  return (
    <PageCover>
        <Title title="User roles"/>
        <Container>
            <RoleDataTable roles={roles} /> 
        </Container>
    </PageCover>
  )
}
