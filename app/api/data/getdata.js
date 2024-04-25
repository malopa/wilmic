"use client"
import {useQuery} from '@tanstack/react-query'
import { getLoan } from '../loan-request/api'

export  function getLoanData(token) {
}

// export  function getCustomerData() {
//     const {token} = useTokenContext()
//   return useQuery({
//     queryKey:['customers'],queryFn:async ()=> await getCustomer(token)
//   })
// }
