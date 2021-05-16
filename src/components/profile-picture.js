import React from 'react'

export default function ProfilePicture({ size, borderRadius, photoURL, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className="profile__pic"
      style={{
        background:
        `lightBlue url(${photoURL}) no-repeat center center`,
        backgroundSize: "cover",
        borderRadius: borderRadius,
        height: size,
        width: size
      }}>
    </div>
  )
}
