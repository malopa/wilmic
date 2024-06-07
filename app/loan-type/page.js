"use client"
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import LoanTable from '../components/LoanTable'
import { getLoanType } from '../api/loan/api'
import { useTokenContext } from '../../context/TokenContext'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default  function LoanTypePage() {
  const [loans,setLoans] = useState()
  const {token} = useTokenContext()
  
  const {isLoading,data} = useQuery({queryKey:["loan-type"],queryFn:async ()=> await getLoanType(token)})



  return (
    <PageCover>
        <Title title="Loan Type" />
        <Container>
              <LoanTable loans={data?.results} /> 
        </Container>
    </PageCover>
  )
}
