import React from "react"
import UserMenu from "./user-menu"

function Header() {
  return(
    <ul className="nav">
      <li className="logo-container">
        <div className="logo-name">BlogXL</div>
        <div className="logo"></div>
      </li>
      <li>
        <UserMenu />
      </li>
    </ul>
  )
}

export default Header