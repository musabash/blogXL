import React, {useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import { menuList } from './menulist'
import {ProfilePicture} from '../components'
import SignInAvatar from './sign-in-avatar'
import { auth } from '../firebase'

export default function UserMenu({ user }) {
  const history = useHistory()
  const [error, setError] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSignOut() {
    auth.signOut().then(() => history.push("/"))
    .catch((error) => {
      setError(`Failed to sign out: ${error.message}`)
    })
  }

  const handleClick = () => setMenuOpen(prev => !prev)

  return (
    <>
      {
        user ?
        <ProfilePicture
          handleClick={handleClick}
          photoURL={user ? user.photoURL : "https://gravatar.com/avatar/8e1741bcab7ec27915445c32a5af4d97?s=600&d=mp&r=pg"}
          size="40px"
          borderRadius="50%"
        /> : 
        <SignInAvatar />
      }
      <div 
        onMouseLeave={() => setMenuOpen(false)}
        className={menuOpen ? "user__menu__container user__menu-open" : "user__menu__container"}
      >
        <ul className="user__menu__list">
          {menuList.map(elm => (
              <Link onClick={() => setMenuOpen(false)} key={elm.id} className="user__menu__link" to={elm.to}>{elm.name}</Link>
          ))}
          <li
            className="user__menu__link"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </li>
        </ul>
      </div>
    </>
  )
}
