"use client"
import React from 'react'
import PageCover from '../../components/PageCover'
import Title from '../../components/Title'
import Container from '../../components/Container'
import ClientLoans from '../../components/ClientLoans';

export default function page({params}) {

  return (
    <PageCover>
        <Title title="Customer Loans" />
        <Container>
            <ClientLoans id={params.slug} />
        </Container>
    </PageCover>
  )
}
