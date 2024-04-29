"use client"
import React from 'react'
import PageCover from '../components/PageCover'
import Title from '../components/Title'
import Container from '../components/Container'
import FeatureDatatable from '../components/FeatureDatatable'


export default function FeaturePage() {
  return (
    <PageCover>
        <Container>
            <Title title="Features" />
            <FeatureDatatable />
        </Container>
    </PageCover>
  )
}
