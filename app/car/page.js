import React from 'react'
import PageCover from '../components/PageCover'
import Container from '../components/Container'
import Title from '../components/Title'
import CarDatatable from '../components/CarDatatable'

export default function page() {
  return (
    <PageCover>
        <Container>
            <Title title="Cars" />
            <CarDatatable />
        </Container>
    </PageCover>
  )
}
