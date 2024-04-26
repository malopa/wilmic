"use client"
import React, { useEffect } from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import CustomDatatable from '../components/CustomDatatable'
import { useTokenContext } from '../../context/TokenContext'
import { getCustomer } from '../api/customer/api'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../components/Spinner'

export default function CustomerPage() {

  const {token} = useTokenContext()

  const {isLoading,data:customers} = useQuery({queryKey:['customers'],queryFn:async ()=>getCustomer(token)})
  
  return (
    <PageCover >
            <Title title="Clients"/>
            <Container>
              {isLoading && <Spinner />}
                <CustomDatatable  customers={customers?.results}/> 
            </Container>
    </PageCover>
  )
}
