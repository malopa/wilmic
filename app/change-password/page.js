"use client"
import React, { useState } from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import Input from '../components/Input'
import PrimaryBtn from '../components/PrimatuButton'
import { useTokenContext } from '../../context/TokenContext'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '../api/user/api'

export default function Changepage() {

  const [new_password,setNewPassword]  = useState()
  const [confirm_password,setConfirmPassword] =   useState()
  const {token} = useTokenContext()



  const mutation = useMutation({mutationFn:changePassword,onSettled:(data)=>{
    alert(JSON.stringify(data))
  }})
  const saveData = ()=>{
    let data = {new_password,confirm_password,token}
    // alert(JSON.stringify(data))
    // return;
    mutation.mutate(data)
  }
  return (
    <PageCover>
        <Title title="Change Password" />

        <Container>
          <div className='flex p-4 justify-center items-center'>
            <div className='w-[500px]'>

              <div className='block w-full'>
                <label className='block mb-2'>New Password</label>
                <Input type="password"
                name="new_password"
                value={new_password}
                onChange={(e)=>setNewPassword(e.target.value)}
                placeholder="New password" />
              </div>
              
              <div className='block w-full mt-3'>
                <label className='block mb-2'>Confirm New Password</label>
                <Input type="password"
                 name="confirm_password"
                 value={confirm_password}
                 onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="New password" />
              </div>

              <PrimaryBtn  onClick={saveData} isLoading={mutation.isLoading} label="Change Password"/>

            </div>
          </div>
        </Container>
    </PageCover>
  )
}
