import React, {useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import { menuList } from './menu-lists'
import {ProfilePicture} from '../components'
import SignInAvatar from './sign-in-avatar'
import { auth } from '../firebase'
import { useAuthListener } from '../hooks'
import { UserMenuLink, UserMenuContainer, UserMenuList } from './header/styles/header'

export default function UserMenu() {
  const history = useHistory()
  const [error, setError] = useState("")
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { user } = useAuthListener()

  function handleSignOut() {
    auth.signOut().then(() => history.push("/"))
    .catch((error) => {
      setError(`Failed to sign out: ${error.message}`)
    })
  }

  const handleClick = () => setMenuIsOpen(prev => !prev)

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
      <UserMenuContainer 
        onMouseLeave={() => setMenuIsOpen(false)}
        menuIsOpen={menuIsOpen}
      >
        <UserMenuList>
          {menuList.map(elm => (
              <UserMenuLink onClick={() => setMenuIsOpen(false)} key={elm.id} to={elm.to}>{elm.name}</UserMenuLink>
          ))}
          <UserMenuLink onClick={() => handleSignOut()}>
            Sign Out
          </UserMenuLink>
        </UserMenuList>
      </UserMenuContainer>
    </>
  )
}
