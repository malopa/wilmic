import React from 'react'
import TaxDataTable from '../components/TaxDataTable'
import Container from '../components/Container'
import PageCover from '../components/PageCover'
import Title from '../components/Title'

export default function page() {

  return (
    <PageCover>
        <Title title="Tax"/>
        <Container>
            <TaxDataTable /> 
        </Container>
    </PageCover>
  )
}
