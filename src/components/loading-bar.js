import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: gray;
  width: 20%;
  height: 4px;
`
const Bar = styled.div`
  background: blue;
  height: 4px;
  width: ${({picLoadingPercent}) => `${picLoadingPercent}%`}
`

export default function LoadingBar({picLoadingPercent}) {
  return (
    <Container>
      <Bar picLoadingPercent={picLoadingPercent}></Bar>
    </Container>
  )
}
