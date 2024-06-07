"use client"
import React, { useEffect, useState } from 'react'
import PageCover from '../components/PageCover'
import Container from '../components/Container'
import Title from '../components/Title'
import WeekDataTable from '../components/WeeklyData'

import { useQuery } from '@tanstack/react-query'
import { getDates } from '../api/customer/api'
import { useTokenContext } from '../../context/TokenContext'

export default function WeekData() {
    const {token} = useTokenContext()

    const {isLoading:isDate,data:dates} = useQuery({queryKey:['months'],queryFn:async ()=>getDates(token)})

  const [weekData,setWeekData] = useState([])
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
        console.log("----date---",date)
        return date >= startOfWeek && date <= endOfWeek;
    });
    
    setWeekData(datesWithinWeek)

  },[dates])

  

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


  return (
    <PageCover>
        <Container>
            <Title title="This Month due payments" />

            {JSON.stringify(dates?.results)}
            <WeekDataTable data={dates?.results} />
        </Container>
    </PageCover>
  )
}
