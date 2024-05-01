"use client"
import Title from '../components/Title'
import Container from '../components/Container'
import DashboardCard from '../components/DashboardCard'
import { getLoanData } from '../api/data/getdata'
import Spinner from '../components/Spinner'
import { useTokenContext } from '../../context/TokenContext'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSession } from '../api/lib'
import { getLoan } from '../api/loan-request/api'


export default function DashboardPage() {
  
  const {token,setToken} = useTokenContext()

  // const {isLoading,data} = getLoanData(token)

  useEffect(() => {

    async function getToken(){
        let to = await getSession()
        setToken(to?.access)
    }

    getToken()
    }, []);

  const {isLoading,data} = useQuery({queryKey:['loans'],queryFn:async ()=> await getLoan(token)})

  return (
      <div>
          <Container>

            <div className='pl-28'>
              <Title title="Dashboard" />
            </div>
          {isLoading && <Spinner />}
            <div className='flex justify-center'>

              <DashboardCard data={data?.results} number={data?.results?.length} icon='users' title="Total Customers" path='/customer'/>
              <DashboardCard  data={data?.results} number={data?.results?.length} icon='dollar'  path='/loan' title="Loan Cars"/>

            </div>

            <div className='flex justify-center mt-4'>
                {/* <DashboardCard  data={data?.results} number={data?.results?.filter(p=>p.status=='Approved').length} icon='dollar' title="Total Loans Disbursed "/> */}
                {/* <DashboardCard  data={data?.results} sign="TSH" number={20} icon="dollar" title="Total Cash Disbursed"/> */}
            </div>

          </Container>
          
      </div>
  )
}
