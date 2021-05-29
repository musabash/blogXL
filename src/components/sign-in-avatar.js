import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function SignInAvatar({hide}) {
  const [isHidden, setIsHidden] = useState(hide)
  return (
    !isHidden &&
    <Link to="/">
      <div
        className= "btn signin-avatar"
        onClick={() => setIsHidden(true)}
      >Sign in</div>
    </Link>
  )
}