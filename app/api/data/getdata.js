"use client"
import {useQuery} from '@tanstack/react-query'
import { getLoan } from '../loan-request/api'
import { useTokenContext } from '../../../context/TokenContext'
import { getCustomer } from '../customer/api'

export  function getLoanData() {
    const {token} = useTokenContext()
  return useQuery({
    queryKey:['loans'],queryFn:async ()=> await getLoan(token)
  })
}

// export  function getCustomerData() {
//     const {token} = useTokenContext()
//   return useQuery({
//     queryKey:['customers'],queryFn:async ()=> await getCustomer(token)
//   })
// }
