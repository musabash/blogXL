import React from 'react'
import { Link } from 'react-router-dom'
import ProfilePicture from './profile-picture'
import { SIGN_IN } from '../constants/routes'

export default function SignInAvatar() {
  return (
    <Link to={SIGN_IN}>
      <ProfilePicture
        id={"guest"}
        size="40px"
        borderRadius="50%"
      />
    </Link>
  )
}