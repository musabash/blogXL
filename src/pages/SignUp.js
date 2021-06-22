import React, { useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { useHistory } from "react-router-dom"
import { Form } from "../components"

function SignUp() {
  const {signup, updateUser} = useContext(UserContext)
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const isInvalid = displayName === '' || password === '' || email === '';
  
  async function handleSubmit(e){
    e.preventDefault()
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
  }

  return(
    <Form>
      <Form.Title>Sign Up</Form.Title>
      
      <Form.Base onSubmit={handleSubmit}>
        {error && <Form.Error>{error}</Form.Error>}
        <Form.Input
          required
          value={displayName}
          type="text"
          placeholder="Username"
          onChange={(e) => {setDisplayName(e.target.value)}}
        />
        <Form.Input
          required
          value={email}
          type="email"
          placeholder="Email Address"
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <Form.Input
          required
          value={password}
          type="password"
          autoComplete="off"
          placeholder="Your Password"
          onChange={(e) => {
          setPassword(e.target.value)}}
        />        
        <Form.Submit
          disabled={isInvalid || loading}
          type="submit"
        >
          Sign up
        </Form.Submit>
        <Form.Text>
          Already have an account?{" "}
          <Form.Link to="/">Sign in here</Form.Link>
        </Form.Text>
      </Form.Base>
    </Form>
  )
}

export default SignUp