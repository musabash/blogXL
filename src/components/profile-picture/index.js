import React, { useEffect, useState} from 'react'
import { db } from '../../firebase';
import { Container, ImageContainer, SubText } from './profile-picture-style'

export default function ProfilePicture({subText, size, borderRadius, id, handleClick}) {
  const [url, setUrl] = useState();
  const docRef = db.collection("users").doc(id)
  
  useEffect(() => {
    let unsubscribe = docRef
      .onSnapshot((snapshot) => {
      setUrl(snapshot.data().photoURL)
      }, (error) => {console.log("ERROR:", error.message)})
      return () => unsubscribe
    }, [])

  return (
    <Container size={size}>
      <ImageContainer
        size={size}
        borderRadius={borderRadius}
        photoURL={url}
        onClick={handleClick}/>
      {subText && <SubText>Click on your profile photo to choose file.</SubText>}
    </Container>
  )
}
