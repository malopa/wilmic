"use client"
import {useQuery} from '@tanstack/react-query'
import { getLoan } from '../loan-request/api'

export  function getLoanData(token) {
  return useQuery({queryKey:['loans'],queryFn:async ()=> await getLoan(token)})
}

// export  function getCustomerData() {
//     const {token} = useTokenContext()
//   return useQuery({
//     queryKey:['customers'],queryFn:async ()=> await getCustomer(token)
//   })
// }
