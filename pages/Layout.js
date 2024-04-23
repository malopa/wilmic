import React from 'react'

export default function Layout(props) {
  return (
    <div>
        <div>Test this layout </div>
        <div>{props.children}</div>
    </div>
  )
}
