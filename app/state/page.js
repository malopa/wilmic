"use client"
import React from 'react'
import PageCover from '../components/PageCover'
import Container from '../components/Container'
import Title from '../components/Title'
import StateDataTable from '../components/StateDataTable'


export default function StatePage() {
  return (
    <PageCover>
      <Container>
        <Title title="State" />
        <StateDataTable />
      </Container>
    </PageCover>
  )
}
