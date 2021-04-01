import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return(
    <ul className="nav">
      <li><Link to="/ProfilePage">Profile Page</Link></li>
      <li><Link to="/Dashboard">Dashboard</Link></li>
      <li>
        <Link to="/create">New Blog</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li><Link to="/PasswordReset">Reset Password</Link></li>
    </ul>
  )
}

export default Header