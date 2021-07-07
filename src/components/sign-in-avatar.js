import React from 'react'
import { Link } from 'react-router-dom'

export default function SignInAvatar() {
  return (
    <Link to="/">
      <img
        src="../assets/images/avatar.png"
        alt="avatar"
        style={{  
          backgroundSize: "cover",
          borderRadius: "50%",
          height: "50px",
          width: "50px"
        }}
      />
    </Link>
  )
}