import React, {useState} from 'react'
import ProfilePicture from './profile-picture'
import { Link, useHistory } from "react-router-dom"
import { menuList } from './menulist'
import SignInAvatar from './sign-in-avatar'

export default function UserMenu({signout, user}) {
  const history = useHistory()
  const [error, setError] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut() {
    setError("")
    try {
      await signout()
      history.push("/")
    } catch(error) {
      setError(`Failed to sign out: ${error.message}`)
    }
  }

  const handleClick = () => setMenuOpen(prev => !prev)

  return (
    <>
      {
        user ?
        <ProfilePicture
          displayName={user.displayName}
          handleClick={handleClick}
          photoURL={user.photoURL}
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
