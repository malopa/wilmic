import { Button } from 'primereact/button'
import React from 'react'

export default function PrimaryBtn(props) {

  return (
    <Button 
        label={props.label}
        onClick={props.onClick}
        icon={`pi ${props.mutation.isPending?' pi-spin pi-spinner':'pi-check'}`}
        className='bg-green-400 rounded-md outline-none p-2.5 mt-4 w-full text-white font-bold' 
    />
  )

}
