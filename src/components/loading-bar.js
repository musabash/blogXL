import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: gray;
  width: 20%;
  color: white;
`
const Bar = styled.div`
  background: blue;
  height: 8px;
  width: ${({picLoadingPercent}) => `${picLoadingPercent}%`}
`

const Text = styled.p`
  color: white;
  text-align: center;
  border-bottom: 1px solid white;
  padding-top: 0.6em;
`

export default function LoadingBar({file, picLoadingPercent}) {
  return (
    <Container >
     {file && <Text file={file}>File: {file.name} {file.size} KB</Text>}
      <Bar picLoadingPercent={picLoadingPercent}></Bar>
    </Container>
  )
}
