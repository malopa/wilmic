import React from 'react'
import PageCover from '../components/PageCover'
import Container from '../components/Container'
import Title from '../components/Title'
import ModelDataTable from '../components/ModelDataTable'

export default function page() {
  return (
    <PageCover>
      <Container>
        <Title title="Models" />
        <ModelDataTable />
      </Container>
    </PageCover>
  )
}
