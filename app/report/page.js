import React from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import ReportDataTable from '../components/ReportDataTable'


export default  function page() {

  // const token = await getSession()


  // if(!token?.access){
  //   return redirect("/")
  // }

  // const users = await readLogs(token.access)



  return (
    <PageCover>
        <Title title="Reports"/>
        <ReportDataTable  />
    </PageCover>
  )
}
