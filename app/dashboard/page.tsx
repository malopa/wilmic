"use client"
import Title from '../components/Title'
import Container from '../components/Container'
import DashboardCard from '../components/DashboardCard'
import { getLoanData } from '../api/data/getdata'
import Spinner from '../components/Spinner'
import { useTokenContext } from '../../context/TokenContext'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSession } from '../api/lib'
import { getCustomerLoan, getLoan, getUser } from '../api/loan-request/api'
import { getCustomer, getDates } from '../api/customer/api'


export default function DashboardPage() {
  
  const {token,user_id,setFname} = useTokenContext()

  // const {isLoading,data} = getLoanData(token)
  const {isLoading,data} = useQuery({queryKey:['loans'],queryFn:async ()=> await getCustomerLoan(token)})
  const {isLoading:isUser,data:userInfo} = useQuery({queryKey:['user'],queryFn:async ()=> await getUser({token,id:user_id})})
  const {isLoading:isCustomer,data:customers} = useQuery({queryKey:['customers'],queryFn:async ()=>getCustomer(token)})
  const {isLoading:isDate,data:dates} = useQuery({queryKey:['dates'],queryFn:async ()=>getDates(token)})

  const [weekData,setWeekData] = useState([])
  const [totalLoanDisbursed,setTotalLoanDisbursed] = useState(0)
  const [monthData,setMonthData] = useState([])

  useEffect(()=>{

    var today = new Date();

    // Calculate the start and end dates of the current week
    var startOfWeek = new Date(today);
    startOfWeek.setHours(0, 0, 0, 0 - today.getDay());
    var endOfWeek = new Date(today);
    endOfWeek.setHours(23, 59, 59, 999 + (6 - today.getDay()));
    
    // Filter dates that fall within the current week
    var datesWithinWeek = dates?.results?.filter(function(item) {
        var date = new Date(item.date);
        // console.log("----date---",date)
        return date >= startOfWeek && date <= endOfWeek;
    });
    
    setWeekData(datesWithinWeek)

  },[dates])

  
  useEffect(()=>{
    let total = 0;
    data?.results?.map(p=>{
      if(p.status=='Approved'){
        total += +p.amount
      }
    })
    setTotalLoanDisbursed(total)
  },[data])

  useEffect(()=>{
    var today = new Date();
    var currentMonth = today.getMonth() + 1; // Months are 0-based, so adding 1

    // Filter dates that fall within the current month
    var datesWithinMonth = dates?.results?.filter(function(item) {
        var date = new Date(item.date);
        return date.getMonth() + 1 === currentMonth; // Adding 1 as months are 0-based
    });
    
    setMonthData(datesWithinMonth)

  },[dates])


  useEffect(()=>{
    setFname(userInfo?.first_name)
  },[userInfo])



  return (
      <div>
          <Container>
           
          <div className='w-[80%] m-auto'>
          
            <div className='flex justify-center'>
              <DashboardCard data={data?.results} number={customers?.results?.length} icon='users' title="Total Customers" path='/customer'/>
              <DashboardCard  data={data?.results} number={data?.results?.filter(p=>p.status=='pending').length} icon='dollar'  path='/loan' title="Pending Loans"/>

            </div>

            <div className='flex justify-center mt-4'>
                <DashboardCard  data={data?.results} number={data?.results?.filter(p=>p.status=='Approved').length} icon='dollar' path='/loan' title="Total Loans Disbursed "/>
                <DashboardCard  data={monthData} sign="TSH" number={totalLoanDisbursed} icon="dollar" path="/dashboard" title="Total Cash Disbursed"/>
            </div>

            <div className='flex justify-center mt-4'>
                <DashboardCard  data={weekData} number={weekData?.length} icon='users' title="Loa  due this week " path="/week" />
                <DashboardCard  data={monthData}  number={monthData?.length} icon="users" title="Loan due this month" path="/week?page=m" />
            </div>

        </div>
          </Container>
          
      </div>
  )
}
