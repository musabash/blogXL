import React, { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const {signin} = useContext(UserContext)
  const history = useHistory()
  
  async function handleSubmit(e){
    e.preventDefault()
    try{
      setError("")
      setLoading(true)
      await signin(email, password)
      history.push("/ProfilePage")
    } catch(error) {
      setError(`Failed to sign in: ${error.message}`)
    }
    setLoading(false)
    setEmail("")
    setPassword("")
  }

  return(
    
    <div className="form-area">
      <h1>Sign In</h1>
      {error && <h4 className="error">{error}</h4>}
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="label">Email</label>
        <input required value={email} type="email" className="input" name="email" placeholder="e.g. xyz@abc.com" onChange={(e) => {
          setEmail(e.target.value)
        }}/>
        <label htmlFor="password" className="label">Password</label>
        <input required value={password} type="password" className="input" name="password" placeholder="Your Password" onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        <button className="btn btn-signin" type="submit">Sign in</button>
        <p style={{textAlign: "center", margin: "0 auto"}}>or</p>
        <input type="button" className="btn btn-google" value="Sign in with Google"/>
        <p style={{textAlign: "center", margin: "0.2em auto", fontSize:"0.9em"}}>Don't have an account?{" "}
          <Link to="SignUp" className="sub-link">Sign up here</Link>
        </p>
        <p style={{textAlign: "center", margin: "0.2em auto", fontSize:"0.8em"}}>
        <Link to="PasswordReset" className="sub-link">Forgot Password?</Link></p>
      </form>
      
    </div>
  )
}

export default SignIn