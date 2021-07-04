import React from 'react'
import { Container } from './profile-picture-style'

export default function ProfilePicture({size, borderRadius, photoURL, handleClick}) {
  return (
    <Container size={size} borderRadius={borderRadius} photoURL={photoURL} onClick={handleClick}>
    </Container>
  )
}
