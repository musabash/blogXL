import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return(
    <ul>
      <li><Link to="/ProfilePage">Profile Page</Link></li>
      <li><Link to="/">Sign In</Link></li>
      <li><Link to="/SignUp">Sign Up</Link></li>
      <li><Link to="/PasswordReset">Reset Password</Link></li>
    </ul>
  )
}

export default Header