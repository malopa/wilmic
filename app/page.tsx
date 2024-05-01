
"use client"
import { Toast } from 'primereact/toast';
import Input from './components/Input'
import PrimaryButton from './components/PrimatuButton'
import {login} from './api/lib'
import {SubmitButton} from './components/SubmitButton'
import { useFormState } from 'react-dom'

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
// import { useRouter } from 'next/router'
       
  // Create a client

const queryClient = new QueryClient()

const initialState = {
    "username":"",
    "password":''
}
export default async function Page() {
    const [state, formAction] = useFormState(login, initialState)

    const saveData = ()=>{
        
    }
    
    return <div className="flex flex-col items-center justify-between p-24
    ">
        <div className='w-[400px]'>

            
            <form action={login} className='border-1 rounded-lg px-4 py-4'>


                <center>
                    <img src='logo.jpg' className='w-[140px]' alt="image"/>
                </center>

            <div className='font-bold text-center p-2 mt-[40px] text-xl'>Log In</div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="username" className='text-black'>Username</label>
                    <Input 
                        name="username"
                        required
                        // onChange={(e)=>setUsername(e.target.value)}
                    />
                    <p aria-live="polite" className="sr-only">
                        {state?.message}
                    </p>
                </div>

                <div className='flex justify-end my-2'>
                    <Link className='mt-4 underline text-blue-400' href="/">Forget password?</Link>
                </div>

                <div className="flex flex-column mt-0">
                    <label htmlFor="password">Password</label>
                    <Input 
                        name="password"
                        type="password"
                        // onChange={(e)=>setPassword(e.target.value)}
                    />

                </div>


                <SubmitButton label="Log In" onClick={()=>saveData()}/>

                

            </form>
        </div>

        </div>
  }