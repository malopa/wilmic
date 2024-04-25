"use client"
import React, { useEffect } from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import CustomDatatable from '../components/CustomDatatable'
import { useTokenContext } from '../../context/TokenContext'
import { getCustomer } from '../api/customer/api'
export default function page() {

  const {token} = useTokenContext()
  const [customers,setCustomers] = React.useState()


  useEffect(()=>{
    getCustomer(token)
    .then(res=>setCustomers(res.results))
  },[token])

  
  return (
    <PageCover >
            <Title title="Clients"/>
            <Container>
                <CustomDatatable  customers={customers}/> 
            </Container>
    </PageCover>
  )
}
