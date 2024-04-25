"use client"
import Title from '../components/Title'
import Container from '../components/Container'
import DashboardCard from '../components/DashboardCard'
import { getLoanData } from '../api/data/getdata'
import Spinner from '../components/Spinner'
import { useTokenContext } from '../../context/TokenContext'
import { useEffect } from 'react'


export default function Page() {
  
  const {token} = useTokenContext()

  const {isLoading,data} = getLoanData(token)

  useEffect(()=>{
    // window.location.reload()
  },[])

  return (
      <div>
          <Container>

            <div className='pl-28'>
              <Title title="Dashboard" />
            </div>
            
            <div className='flex justify-center'>
          {isLoading && <Spinner />}

              <DashboardCard data={data?.results} number={data?.results?.length} icon='users' title="Total Customers" path='/customer'/>
              <DashboardCard  data={data?.results} number={data?.results?.filter(p=>p.status=='pending').length} icon='dollar'  path='/loan' title="Loan Pending"/>
            </div>

            <div className='flex justify-center mt-4'>
                <DashboardCard  data={data?.results} number={data?.results?.filter(p=>p.status=='Approved').length} icon='dollar' title="Total Loans Disbursed "/>
                <DashboardCard  data={data?.results} sign="TSH" number={20} icon="dollar" title="Total Cash Disbursed"/>
            </div>

          </Container>
          
      </div>
  )
}
