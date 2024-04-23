"use client"
import React, { useEffect, useState } from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import LoanRequestTable from '../components/LoanRequestTable'
import { getLoan } from '../api/loan-request/api'
import { useTokenContext } from '../../context/TokenContext'

export default function page() {
  const {token} = useTokenContext()
  const [loans,setLoans] = useState()

  // useEffect(()=>{
  //   getLoan(token)
  //   .then(res=>{
  //     setLoans(res.results)
  //   })
  // },[])

  return (
    <PageCover>
        <Title title="Loans" />
        <Container>
            <LoanRequestTable  loans={loans}/> 
        </Container>
    </PageCover>
  )
}
