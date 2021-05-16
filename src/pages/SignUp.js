import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link, useHistory } from "react-router-dom"
import { load } from 'recaptcha-v3'

function SignUp() {
  const {signup, updateUser} = useContext(UserContext)
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  
  async function handleSubmit(e){
    e.preventDefault()
    if (password !== confirmedPassword) {
      return setError("Passwords do not match!")
    }
    try{
      setError("")
      setLoading(true)
      await signup(email, password)
      await updateUser({
        displayName: displayName,
        photoURL: 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'
      })
      history.push("/ProfilePage")
    } catch(error) {
      setError(`Failed to create an account: ${error.message}`)
    }
    setLoading(false)
    setDisplayName("")
    setEmail("")
    setPassword("")
    setConfirmedPassword("")
  }

  async function capt() {
    const recaptcha = await load('<site key>')
    const token = await recaptcha.execute('<action>')
  
    console.log(token)
  }

  return(
    
    <div className="form-area">
      <h1>Sign Up</h1>
      
      <form className="form" onSubmit={handleSubmit}>
        {error && <h4 className="error">{error}</h4>}
        <label 
          htmlFor="displayName"
          className="label"
        >
          User Name
        </label>
        <input
          required
          value={displayName}
          type="text"
          className="input"
          name="displayName"
          placeholder="e.g. John123"
          onChange={(e) => {setDisplayName(e.target.value)}}
        />
        <label
          htmlFor="email"
          className="label"
        >
          Email
        </label>
        <input
          required
          value={email}
          type="email"
          className="input"
          name="email"
          placeholder="e.g. xyz@abc.com"
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <label
          htmlFor="password"
          className="label"
        >
          Password
        </label>
        <input
          required
          value={password}
          type="password"
          className="input"
          name="password"
          placeholder="Your Password"
          onChange={(e) => {
          setPassword(e.target.value)}}
        />
        <label
          htmlFor="confirmedPassword"
          className="label"
        >
          Password Confirmation <span>{password !== confirmedPassword && "!!!Passwords do not match!!!"}</span>
        </label>
        <input
          required
          value={confirmedPassword}
          type="password"
          className="input"
          name="confirmedPassword"
          placeholder="Re-type Your Password"
          onChange={(e) => {setConfirmedPassword(e.target.value)}}
        />
        
        <button
          disabled={loading}
          className="btn btn-signup" 
          type="submit"
        >
          Sign up
        </button>
        <p style={{textAlign: "center", margin: "0 auto"}}>or</p>
        <input
          type="button"
          className="btn btn-google" 
          value="Sign in with Google"
        />
        <p
          style={{
            textAlign: "center",
            margin: "0.2em auto",
            fontSize:"0.8em"
          }}
        >
          Already have an account{" "}
          <Link to="/" className="sub-link">Sign in here</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp