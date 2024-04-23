import React from 'react'
import PageCover from '../components/PageCover'
import Container from '../components/Container'
import BrandDataTable from '../components/BrandDataTable'
import Title from '../components/Title'


export default function page() {

  return (
    <PageCover>
        <Container>
            <Title title="Brands" />
            <BrandDataTable />
        </Container>
    </PageCover>
  )
}
