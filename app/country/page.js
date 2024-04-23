import React from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import { Contrail_One } from 'next/font/google'
import Container from '../components/Container'

export default function page() {
  return (
    <PageCover>
        <Container>
            <Title title="Country" />
        </Container>
    </PageCover>
  )
}
