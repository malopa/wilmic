import React from 'react'
import PageCover from '../components/PageCover'
import Container from '../components/Container'
import Title from '../components/Title'
import ConditionDatatable from '../components/ConditionDatatable'

export default function page() {
  return (
    <PageCover>
      <Container>
        <Title title="Conditions" />
        <ConditionDatatable />
      </Container>
    </PageCover>
  )

}
