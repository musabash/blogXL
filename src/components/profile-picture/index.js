import React from 'react'
import usePhotoUrl from '../../hooks/usePhotoUrl'
import { Container, ImageContainer, SubText } from './profile-picture-style'

export default function ProfilePicture({subText, size, borderRadius, id, handleClick}) {
  const photoURL = usePhotoUrl(id)
  return (
    <Container size={size}>
      <ImageContainer size={size} borderRadius={borderRadius} photoURL={photoURL} onClick={handleClick}/>
      {subText && <SubText>Click on your profile photo to choose file.</SubText>}
    </Container>
  )
}
