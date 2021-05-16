import React, {useState} from 'react'
import ProfilePicture from './profile-picture'
import { Link, useHistory } from "react-router-dom"
import { menuList } from './menulist'

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
      {user && <ProfilePicture handleClick={handleClick} photoURL={user.photoURL}  size="30px" borderRadius="50%"/>}
      <div onMouseLeave={() => setMenuOpen(false)} className={menuOpen ? "user__menu__container user__menu-open" : "user__menu__container"}>
        
        <ul className="user__menu__list">
          {menuList.map(elm => (
            <li key={elm.id} className="user__menu__link">
              <Link to={elm.to}>{elm.name}</Link>
            </li>
          ))}
          <button onClick={() => handleSignOut()}>Sign out</button>
        </ul>
      </div>
    </>
  )
}
