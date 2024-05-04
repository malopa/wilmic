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
import { getAssets, getAttachment, getCustomerEmployee, getCustomerInfo, getCustomerSponsor } from '../../api/customer/api'
import { useTokenContext } from '../../../context/TokenContext'


export default function CustomerDetailspage({params}) {

  const [isEmployeeAdd,setIsEmployee] = useState(false)
  const [isAttachment,setAttachment] = useState(false)
  const [isBusinessAdd,setIsBusiness] = useState(false)
  const [isAssetAdd,setIsAsset] = useState(false)

  const {token} = useTokenContext()
  const {isLoading,data} = useQuery({queryKey:['customer-data'],queryFn:async ()=>getCustomerInfo({token,id:params?.slug})})
  const {isLoading:isSponsor,data:sponsor} = useQuery({queryKey:['sponsor'+params.slug],queryFn:async ()=>getCustomerSponsor({token,id:params?.slug})})
  const {isLoading:isEmployee,data:employee} = useQuery({queryKey:['employee'+params.slug],queryFn:async ()=>getCustomerEmployee({token,id:params?.slug})})
  const {isLoading:isAssets,data:assets} = useQuery({queryKey:['assets'+params.slug],queryFn:async ()=>getAssets({token,id:params?.slug})})
  const {isLoading:isAttach,data:attachments} = useQuery({queryKey:['attachments'+params.slug],queryFn:async ()=>getAttachment({token,id:params?.slug})})


  return (
    <PageCover>
        <Container>
            {/* <Title title="Customer Details" /> */}

            <div style={{maxHeight:'80vh',overflowY:'auto'}}>
            <div>
              <div className='font-bold text-xl py-2 px-2'>Client Information</div>
              <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                  <div><span  className='w-[8rem] inline-block' >First Name:</span> <span className='p-4 text-gray-700'>{data?.first_name}</span></div>
                  <div><span className='w-[8rem] inline-block'>Middle Name:</span> <span className='p-4 text-gray-700'>{data?.middle_name}</span></div>
                  <div><span className='w-[8rem] inline-block'>Last Name:</span> <span className='p-4 text-gray-700'>{data?.last_name}</span></div>
                </div>

                <div >
                  <div><span  className='w-[8rem] inline-block' >Phone Number:</span> <span className='p-4 text-gray-700'>{data?.phone_number}</span></div>
                  <div><span  className='w-[8rem] inline-block' >Gender:</span> <span className='p-4 text-gray-700'>{data?.gender}</span></div>
                  <div><span  className='w-[8rem] inline-block' >Region:</span> <span className='p-4 text-gray-700'>{data?.address}</span></div>
                </div>

                <div >
                  <div><span  className='w-[8rem] inline-block' >Nida: </span><span className='p-4 text-gray-600'>{data?.nida}</span></div>
                  <div><span  className='w-[8rem] inline-block' >house Number:</span> <span className='p-4 text-gray-600'>{data?.house}</span></div>
                  <div><span  className='w-[8rem] inline-block' >Client Type:</span> <span className='p-4 text-gray-600'>{data?.client_type}</span></div>
                  {/* <div><span  className='w-[8rem] inline-block' >Marital Status:</span> <span className='p-4 text-gray-600'>{data?.client_type}</span></div> */}
                </div>


              </div>
            </div>

          
            <div className='mt-4'>
              <div className='font-bold text-xl py-2 px-2'>Client Guarantor</div>
              <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                  <div><span  className='w-[8rem] inline-block' >Sponsor Name:</span> <span className='text-gray-700'>{sponsor?.name}</span></div>
                  <div> <span  className='w-[8rem] inline-block' >Phone number:</span> <span className='text-gray-700'>{sponsor?.phone_number}</span></div>
                  <div><span  className='w-[8rem] inline-block' >Relation:</span> <span className='text-gray-700'>{sponsor?.relation}</span></div>
                </div>

                <div >
                  <div><span  className='w-[8rem] inline-block' >Sponsor Name:</span> <span className='text-gray-700'>{sponsor?.name}</span></div>
                  <div><span  className='w-[8rem] inline-block' >Phone number:</span> <span className='text-gray-700'>{sponsor?.phone_number}</span></div>
                  <div><span  className='w-[8rem] inline-block' >Relation:</span> <span className='text-gray-700'>{sponsor?.relation}</span></div>
                </div>

                <div >
                </div>

              </div>
            </div>


            {data?.client_type == 'employee' && <>

            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div className='py-2'>Client Employee</div>
                <button onClick={()=>setIsEmployee(true)} className=' p-2 bg-blue-800 rounded-md text-white text-sm'><i className='pi pi-plus me-1'></i>Add Employee Details</button>
              </div>

              {employee?.results?.map(r=>{
                return <div key={r.id} className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                  <div>
                    <span  className='w-[10rem] inline-block' >Employee name:</span><span className='p-4 text-gray-700'>{r.employee}</span>
                  </div>

                  <div>
                  <span  className='w-[10rem] inline-block' >Institution Type:</span><span className='p-4 text-gray-700'>{r.institition_type}</span>
                  </div>
                  <div>
                  <span  className='w-[10rem] inline-block' >Work place:</span><span className='p-4 text-gray-700'>{r.work_place}</span>
                  </div>
                  <div>
                  <span  className='w-[10rem] inline-block' >Work position::</span><span className='p-4 text-gray-700'>{r.work_position}</span>
                  </div>
                </div>

                <div >
                 
                  <div><span  className='w-[10rem] inline-block' >Contract start at:</span><span className='p-4 text-gray-700'>{r.start_at.substring(0,10)}</span>
                  </div>
                  <div>
                  <span  className='w-[10rem] inline-block' >Contact end at:</span><span className='p-4 text-gray-700'>{r.end_at.substring(0,10)}</span>
                  </div>
                  <div>
                  <span  className='w-[10rem] inline-block' >Supervisor name:</span><span className='p-4 text-gray-700'>{r.supervisor_name}</span>
                  </div>

                  <div>
                  <span  className='w-[10rem] inline-block' >Contract type:</span><span className='p-4 text-gray-700'>{r.contract_type}</span>
                  </div>
                </div>

                <div >
                  <div>
                  <span  className='w-[10rem] inline-block' >Supervisor email:</span><span className='p-4 text-gray-700'>{r.supervisor_email}</span>
                  </div>

                  <div>
                  <span  className='w-[10rem] inline-block' >Supervisor phone:</span><span className='p-4 text-gray-700'>{r.super_phone}</span>
                  </div>

                  <div><span  className='w-[10rem] inline-block' >Salary before tax:</span><span className='p-4 text-gray-700'>{r.salary_before_tax}</span>
                  </div>
                  <div>
                  <span  className='w-[10rem] inline-block' >Salary after tax:</span><span className='p-4 text-gray-700'>{r.salary_after_tax}</span>
                  </div>
                </div>


              </div>

              })}
              
            </div>
            </>}



        {isEmployeeAdd && 
          <EmployeeDialog  id={params.slug}
          isEmployeeAdd={isEmployeeAdd} setIsEmployee={setIsEmployee} />
        }


        {isAttachment && 
          <AttachmentDialog  id={params.slug}
          isAttachment={isAttachment} type={data.client_type} setAttachment={setAttachment} />
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


      {data?.client_type == 'busines' && <>
            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div>Client Business Details</div>
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

          </>}


            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div>Client Assets</div>
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
                      <div >{r.asset_value}</div>
                    </div>
                  })}
                </div>

                <div >
                </div>

              </div>
            </div>



            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div>Client Attachments</div>
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
                  {attachments?.results?.map(p=>{
                    return <div key={p.id} className='flex w-full border-bottom-1 p-2 border-gray-200 justify-between'>
                      <div>{p.name}</div>
                      <div><a target='_blank' href={`${p.attachment}`}> <img src={`${p.attachment}`} className='w-[100px]' /></a></div>
                      </div>
                  })}
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
