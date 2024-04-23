import React from 'react'
import { InputText } from 'primereact/inputtext';


export default function Input(props) {
  return (
    <input
    name={props.name}
    type={props.type?props.type:'text'}
    onChange={props.onChange}
    autoComplete='off'
    value={props.value}
    placeholder={props.placeholder}
    className='border-black p-[10px] border-1 outline-none rounded-mm w-full border-gray-400' 
    aria-describedby="username-help" />
  )
}
