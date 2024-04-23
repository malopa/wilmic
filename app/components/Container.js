import React from 'react'

export default function Container(props) {
  return (
    <section className='p-2 w-full m-2 min-h-[70vh] max-h-[70vh]'>
              {props.children}
    </section>
  )
}
