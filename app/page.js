
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
import { useState } from 'react';
import { useTokenContext } from '../context/TokenContext';
       
  // Create a client

const queryClient = new QueryClient()

const initialState = {
    "username":"",
    "password":''
}
export default function PageLogin() {
    // const [state, formAction] = useFormState(login, initialState)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const {setToken} = useTokenContext()

    const router = useRouter()

    const mutation = useMutation({mutationFn:login,
        onSuccess:(data)=>{
            setToken(data.access)
           router.push('/dashboard')
        },
        onError:(e)=>{
            alert(JSON.stringify(e))
        }
    })

    const saveData = ()=>{
        if(!username || !password)return
        let data = {username,password}
        mutation.mutate(data)
    }
    
    return <div className="flex flex-col items-center justify-between p-24
    ">
        <div className='w-[400px]'>

            
            <div className='border-1 rounded-lg px-4 py-4'>


                <center>
                    <img src='logo.jpeg' className='w-[100px]' alt="image"/>
                </center>

            <div className='font-bold text-center p-2 mt-[40px] text-xl'>Log In</div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="username" className='text-black'>Username</label>
                    <Input 
                        name="username"
                        required
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>

                <div className='flex justify-end my-2'>
                    <Link className='mt-4 underline text-blue-400' href="/">Forget password?</Link>
                </div>

                <div className="flex flex-column mt-0">
                    <label htmlFor="password">Password</label>
                    <Input 
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                </div>


                <SubmitButton label="Log In" isLoading={mutation.isLoading} onClick={saveData}/>

                

            </div>
        </div>

        </div>
  }