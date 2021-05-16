import React from 'react'

export default function ProfilePicture({ size, borderRadius, photoURL, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className="profile__pic"
      style={{
        background:
        `lightBlue url(${photoURL !== null ? photoURL : 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
        backgroundSize: "cover",
        borderRadius: borderRadius,
        height: size,
        width: size
      }}>
    </div>
  )
}
