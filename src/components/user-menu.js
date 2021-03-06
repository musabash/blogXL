import React, {useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import { menuList } from './menu-lists'
import {ProfilePicture} from '../components'
import SignInAvatar from './sign-in-avatar'
import { auth } from '../firebase'
import { useAuthListener } from '../hooks'

export default function UserMenu() {
  const history = useHistory()
  const [error, setError] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuthListener()

  function handleSignOut() {
    auth.signOut().then(() => history.push("/"))
    .catch((error) => {
      setError(`Failed to sign out: ${error.message}`)
    })
  }

  const handleClick = () => setMenuOpen(prev => !prev)

  return (
    <>
      {error && alert(error)}
      {
        user ?
        <ProfilePicture
          handleClick={handleClick}
          id={user.uid}
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
