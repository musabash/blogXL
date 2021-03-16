import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

function PasswordReset() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState(null)
  const { rstPass } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  async function sendResetEmail(e) {
    e.preventDefault()
    try {
      setEmailSent("")
      setError("")
      setLoading(true)
      await rstPass(email)
      setEmailSent("An email has been sent. Check your inbox for further details.")
    } catch(error) {
      setError(error.message)
    }
    setEmail("")
    setLoading(false)
  }
  return(
    
    <div className="form-area">
      <h1>Password Reset</h1>
      <form action="" className="form" onSubmit={sendResetEmail}>
        {emailSent && <h4 className="success">{emailSent}</h4>}
        {error && <h4 className="error">{error}</h4>}
        <label htmlFor="email" className="label">Email</label>
        <input required value={email} type="email" className="input" name="email" placeholder="Enter your email" onChange={(e) => {
          setEmail(e.target.value)
        }}/>
        <button className="btn btn-reset" type="submit">Send me a reset link</button>
        <Link to="/" className="sub-link">&larr; Back to sign in page</Link>
      </form>
      
    </div>
  )
}
export default PasswordReset