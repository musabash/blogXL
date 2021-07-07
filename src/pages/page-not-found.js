import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  & p {
    color: red;
  }
`
const GoBackButton = styled.button`
  margin: 1em;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.4em 0.7em;
  border: none; 
  &:hover {
    color: red;
  }
`

export default function PageNotFound() {
  const history = useHistory()
  return (
    <Container>
      <p>
        Sorry, the page you are trying to visit does not exist or you are not allowed.
      </p>
      <p>
        If you are not signed in, try again after signing in.
      </p>
      <GoBackButton
        onClick={() => history.goBack()}
      >Go Back</GoBackButton>
    </Container>
  )
}
