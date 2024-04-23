"use client"
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import LoanTable from '../components/LoanTable'
import { getLoanType } from '../api/loan/api'
import { useTokenContext } from '../../context/TokenContext'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default  function page() {
  const [loans,setLoans] = useState()
  const {token} = useTokenContext()
  
  useEffect(()=>{
    getLoanType(token)
    .then(res=>{
      setLoans(res.results)
    })
  },[token])

  const {isLoading,data} = useQuery({queryKey:['query'],queryFn:getLoanType(token)})
  console.log("----use query resukt----",data)

  return (
    <PageCover>
        <Title title="Loan Type" />
        <Container>
              <LoanTable loans={loans} /> 
        </Container>
    </PageCover>
  )
}
