import React, { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import UserMenu from "./user-menu"

function Header() {
  const {signout, user} = useContext(UserContext)
  return(
    <ul className="nav">
      <li className="logo-container">
        <div className="logo-name">BlogXL</div>
        <div className="logo"></div>
      </li>
      <li><UserMenu signout={signout} user={user} /></li>
    </ul>
  )
}

export default Header