"use client"
import React, { useState } from 'react'
import PageCover from '../../components/PageCover'
import Container from '../../components/Container'
import AddFeatures from '../../components/AddFeatures'
import AddOverview from '../../components/AddOverview'
import ImageDialog from '../../components/ImageDialog'

import { useQuery } from '@tanstack/react-query'

import { useTokenContext } from '../../../context/TokenContext'
import { getData } from '../../api/tku/app'
import { BASE_URL } from '../../api/base'


export default function CarDetailspage({params}) {

  const [isFeature,setIsFeature] = useState(false)
  const [isOverview,setIsOverview] = useState(false)
  const [isImage,setIsImage] = useState(false)
  const [product,setProduct] = useState([])

  const {token} = useTokenContext()

  const {isLoading,data:features} = useQuery({queryKey:['features'],queryFn:async ()=>getData({token,id:params?.slug})})
  const {isLoading:isSponsor,data:overviewies} = useQuery({queryKey:['overview'+params.slug],queryFn:async ()=>getData({token,id:params?.slug,url:`${BASE_URL}api/v1/overview-read/?id=${params?.slug}`})})
  const {isLoading:isEmployee,data:images} = useQuery({queryKey:['images'+params.slug],queryFn:async ()=>getData({token,url:`${BASE_URL}api/v1/car-image/?id=${params?.slug}`})})

  return (
    <PageCover>
        <Container>
            {/* <Title title="Customer Details" /> */}

            <div style={{maxHeight:'80vh',overflowY:'auto'}}>
            <div>
              <div className='flex justify-between items-center mx-2' >
                <div className='font-bold text-xl py-2 px-2'>Features</div>
                <button onClick={()=>setIsFeature(true)} className=' p-2 bg-blue-800 rounded-md text-white text-sm'><i className='pi pi-plus me-1'></i>Add Features</button>
              </div>

              <div className='p-4 border-1 rounded-md flex justify-between' >
                <div >
                  
                </div>


              </div>
            </div>

          
            <div className='mt-4'>
            <div className='flex justify-between items-center mx-2' >
              <div className='font-bold text-xl py-2 px-2'>Overview</div>
              <button onClick={()=>setIsOverview(true)} className=' p-2 bg-blue-800 rounded-md text-white text-sm'><i className='pi pi-plus me-1'></i>Add Overview</button>
            </div>

              <div className='p-4 border-1 w-[94%] m-4 rounded-md grid grid-cols-4 gap-4' >
                {/* {JSON.stringify(overviewies?.results)} */}

                {overviewies?.results.map(r=><div key={r.id} className='flex items-center'>
                    <div className='text-black'>{r.name}:-</div>
                    <div className='text-gray-600'>{r.value}</div>
                  </div>
                )}
                

              </div>
            </div>



            <div className='mt-4'>
              <div className='font-bold text-xl px-2 flex justify-between items-center my-2'>
                <div className='py-2'>Images <span className='text-red-300 text-sm underline '><span className='text-red-600 font-bold'>Note:</span> image you upload first will be a profile image</span></div>
                <button onClick={()=>setIsImage(true)} className=' p-2 bg-blue-800 rounded-md text-white text-sm'><i className='pi pi-plus me-1'></i>Add Images</button>
              </div>

              
              
            </div>


        {isFeature && 
          <AddFeatures  id={params.slug}
          isFeature={isFeature} setIsFeature={setIsFeature} />
        }

        {isOverview && 
          <AddOverview  id={params.slug}
          isOverview={isOverview} setIsOverview={setIsOverview} />
        }

        {isImage && 
          <ImageDialog 
          id={params.slug}
          isImage={isImage} setIsImage={setIsImage} />
        }




          <div className='flex flex-wrap'>
              {images?.results?.map(r=>{
                return r.images.map(p=>{
                  return <div key={p.id} className='p-4 border-1 rounded-md flex justify-between' >
                 
                  <div><img style={{width:200}} src={`${p.url}`} /></div>
                 
               </div>
                })

              })}
              </div>

          {/* {images?.results?.map(p=>{
            return <div>
              <div>{p.url}</div>
              <img src={p.url}  style={{width:100}}/>
            </div>
          })} */}

        </div>



        </Container>
    </PageCover>
  )
}
