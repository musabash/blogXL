import React from 'react'

export default function ProfilePicture({displayName, size, borderRadius, photoURL, handleClick }) {
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
      {/* {!photoURL && <span>{displayName[0].toUpperCase()}</span>} */}
    </div>
  )
}
