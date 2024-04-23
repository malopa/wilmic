"use client"
import React from 'react'
import PageCover from '../../components/PageCover'
import Title from '../../components/Title'
import Container from '../../components/Container'
import ClientStatment from '../../components/ClientStatment'

export default function page({params}) {
  return (
    <PageCover >
        <Title title="Customer Loans" />
        <Container >
            <ClientStatment id={params.slug[0]} loan={params.slug[1]} />
        </Container>
    </PageCover>
  )
}
