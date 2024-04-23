import React from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import Input from '../components/Input'
import PrimaryBtn from '../components/PrimatuButton'

export default function page() {
  return (
    <PageCover>
        <Title title="Change Password" />

        <Container>
          <div className='flex p-4 justify-center items-center'>
            <div className='w-[500px]'>

              <div className='block w-full'>
                <label className='block mb-2'>New Password</label>
                <Input type="password" placeholder="New password" />
              </div>
              
              <div className='block w-full mt-3'>
                <label className='block mb-2'>Confirm New Password</label>
                <Input type="password" placeholder="New password" />
              </div>

              <PrimaryBtn label="Change Password"/>

            </div>
          </div>
        </Container>
    </PageCover>
  )
}
