import React from 'react'
import { Container, ImageContainer, SubText } from './profile-picture-style'

export default function ProfilePicture({subText, size, borderRadius, photoURL, handleClick}) {
  return (
    <Container size={size}>
      <ImageContainer size={size} borderRadius={borderRadius} photoURL={photoURL} onClick={handleClick}>
      </ImageContainer>
      {subText && <SubText >Click on your profile photo to choose file.</SubText>}
    </Container>
  )
}
