import React from 'react'
import PageCover from '../components/PageCover'
export default function DashboardLayout(props) {
  return (
      <PageCover>
        <div className="">{props.children}</div>
      </PageCover>
           
  )
}
