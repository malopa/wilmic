"use client"
import React, { useState } from 'react'
import PageCover from '../../components/PageCover'
import Container from '../../components/Container'
import EmployeeDialog from '../../components/EmployeeDialog'
import AttachmentDialog from '../../components/AttachmentDialog'
import AssetsDialogy from '../../components/AssetsDialogy'
import BusinessDialog from '../../components/BusinessDialog'

import Title from '../../components/Title'
import { useQuery } from '@tanstack/react-query'
import { getAssets, getCustomerEmployee, getCustomerInfo, getCustomerSponsor } from '../../api/customer/api'
import { useTokenContext } from '../../../context/TokenContext'


export default function page({params}) {

  const [isEmployeeAdd,setIsEmployee] = useState(false)
  const [isAttachment,setAttachment] = useState(false)
  const [isBusinessAdd,setIsBusiness] = useState(false)
  const [isAssetAdd,setIsAsset] = useState(false)

  const {token} = useTokenContext()
  const {isLoading,data} = useQuery({queryKey:['customer-data'],queryFn:async ()=>getCustomerInfo({token,id:params?.slug})})
  const {isLoading:isSponsor,data:sponsor} = useQuery({queryKey:['sponsor'+params.slug],queryFn:async ()=>getCustomerSponsor({token,id:params?.slug})})
  const {isLoading:isEmployee,data:employee} = useQuery({queryKey:['employee'+params.slug],queryFn:async ()=>getCustomerEmployee({token,id:params?.slug})})
  const {isLoading:isAssets,data:assets} = useQuery({queryKey:['assets'+params.slug],queryFn:async ()=>getAssets({token,id:params?.slug})})

  return (
    <PageCover>
        <Container>
            {/* <Title title="Customer Details" /> */}

            <div style={{maxHeight:'80vh',overflowY:'auto'}}>
            <div>
              <div className='font-bold text-xl px-2'>Customer Information</div>
              <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                  <div><span className='w-[14rem]'>Name:</span> <span className='p-4 text-gray-600'>{data?.first_name}</span></div>
                  <div><span className='w-[14rem]'>Middle Name:</span> <span className='p-4 text-gray-600'>{data?.middle_name}</span></div>
                  <div><span className='w-[14rem]'>Last Name:</span> <span className='p-4 text-gray-600'>{data?.last_name}</span></div>
                </div>

                <div >
                  <div>Phone Number: <span className='p-4 text-gray-600'>{data?.phone_number}</span></div>
                  <div>Gender: <span className='p-4 text-gray-600'>{data?.gender}</span></div>
                  <div>Region: <span className='p-4 text-gray-600'>{data?.address}</span></div>
                </div>

                <div >
                  <div>Nida: <span className='p-4 text-gray-600'>{data?.nida}</span></div>
                  <div>house Number: <span className='p-4 text-gray-600'>{data?.house}</span></div>
                </div>



              </div>
            </div>

          
            <div className='mt-4'>
              <div className='font-bold text-xl px-2'>Customer Guarantor</div>
              <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                  <div><span className='w-[12rem]'>Sponsor Name:</span> {sponsor?.name}</div>
                  <div>Phone number: {sponsor?.phone_number}</div>
                  <div>Relation: {sponsor?.relation}</div>
                </div>

                <div >
                  <div>Sponsor Name: {sponsor?.name}</div>
                  <div>Phone number: {sponsor?.phone_number}</div>
                  <div>Relation: {sponsor?.relation}</div>
                </div>

                <div >
                </div>

              </div>
            </div>



            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div>Customer Employee</div>
                <button onClick={()=>setIsEmployee(true)} className=' p-2 bg-blue-800 rounded-md text-white text-sm'><i className='pi pi-plus me-1'></i>Add Employee Details</button>
              </div>

              {employee?.results?.map(r=>{
                return <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                  <div>Employee name:<span className='p-4 text-gray-600'>{r.employee}</span>
                  </div>
                  <div>
                  Institution Type:<span className='p-4 text-gray-600'>{r.institition_type}</span>
                  </div>
                  <div>
                  Work place:<span className='p-4 text-gray-600'>{r.work_place}</span>
                  </div>
                  <div>
                  Work position::<span className='p-4 text-gray-600'>{r.work_position}</span>
                  </div>
                </div>

                <div >
                 
                  <div>Contract start at:<span className='p-4 text-gray-600'>{r.start_at.substring(0,10)}</span>
                  </div>
                  <div>
                  Contact end at:<span className='p-4 text-gray-600'>{r.end_at.substring(0,10)}</span>
                  </div>
                  <div>
                  Supervisor name:<span className='p-4 text-gray-600'>{r.supervisor_name}</span>
                  </div>

                  <div>
                  Contract type:<span className='p-4 text-gray-600'>{r.contract_type}</span>
                  </div>
                </div>

                <div >
                  <div>
                    Supervisor email:<span className='p-4 text-gray-600'>{r.supervisor_email}</span>
                  </div>

                  <div>
                    Supervisor phone:<span className='p-4 text-gray-600'>{r.super_phone}</span>
                  </div>

                  <div>Salary before tax:<span className='p-4 text-gray-600'>{r.salary_before_tax}</span>
                  </div>
                  <div>
                    Salary after tax:<span className='p-4 text-gray-600'>{r.salary_after_tax}</span>
                  </div>
                </div>


              </div>

              })}
              
            </div>



        {isEmployeeAdd && 
          <EmployeeDialog  id={params.slug}
          isEmployeeAdd={isEmployeeAdd} setIsEmployee={setIsEmployee} />
        }


        {isAttachment && 
          <AttachmentDialog  id={params.slug}
          isAttachment={isAttachment} setAttachment={setAttachment} />
        }



        {isAssetAdd && 
          <AssetsDialogy 
          id={params.slug}
          isAssetAdd={isAssetAdd} setIsAsset={setIsAsset} />
        }


      {isBusinessAdd && 
          <BusinessDialog 
          isBusinessAdd={isBusinessAdd} setIsBusiness={setIsBusiness} />
        }


            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div>Customer Business Details</div>
                <button 
                onClick={()=>setIsBusiness(true)}
                className=' p-2 bg-blue-800 rounded-md text-white text-sm'><i className='pi pi-plus me-1'></i>Add Business</button>
              </div>

              <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                 
                </div>

                <div >
                  
                </div>

                <div >
                </div>



              </div>
            </div>


            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div>Customer Assets</div>
                <button 
                onClick={()=>setIsAsset(true)}
                className=' p-2 bg-blue-800 rounded-md text-white text-sm'><i className='pi pi-plus me-1'></i>Add assets</button>
              </div>
              <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                </div>

                <div className='flex flex-col justify-between items-center w-full' >
                  {assets?.results?.map(r=>{
                    return <div key={r.id} className='flex justify-between items-center border-b-1 border-gray-400 py-2 w-full'>
                      <div> {r.name}</div>
                      <div>{r.asset_value}</div>
                    </div>
                  })}
                </div>

                <div >
                </div>

              </div>
            </div>



            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div>Attachments</div>
                <button 
                onClick={()=>setAttachment(true)}
                className=' p-2 bg-blue-800 rounded-md text-white text-sm'><i className='pi pi-plus me-1'></i>Add Attachment</button>
              </div>
              <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                </div>

                <div className='flex flex-col justify-between items-center w-full' >
                  {/* {assets?.results?.map(r=>{
                    return <div key={r.id} className='flex justify-between items-center border-b-1 border-gray-400 py-2 w-full'>
                      <div> {r.name}</div>
                      <div>{r.asset_value}</div>
                    </div>
                  })} */}
                </div>

                <div >
                </div>



              </div>
            </div>





            
            </div>



        </Container>
    </PageCover>
  )
}
