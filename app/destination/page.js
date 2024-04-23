import React from 'react'
import PageCover from '../components/PageCover'
import Container from '../components/Container'
import Title from '../components/Title'
import DestinationDataTable from '../components/DestinationDataTable'

export default function page() {
  return (
    <PageCover>
        <Container>
            <Title title="Destination" />
            <DestinationDataTable />
        </Container>
    </PageCover>
  )
}
