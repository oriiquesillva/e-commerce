"use client"

import { FilterBar } from '@/components/filter-bar'
import { ProductList } from '@/components/products-list'
import styled from 'styled-components'

const PageWrapper = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px;
    background-color: var(--bg-primary);

    @media(min-width: ${props => props.theme.desktopBreakpoint}){
      padding: 34px 160px;
    }
`


export default function Home() {
  return (
      <PageWrapper>
        <FilterBar/>
        <ProductList/>
    </PageWrapper>

  )
}
