import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Form } from "../components"
import { UserContext } from "../contexts/UserContext"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const {signin} = useContext(UserContext)
  const history = useHistory()
  const isInvalid = password === '' | email === '';
  
  async function handleSubmit(e){
    e.preventDefault()
    try{
      setError("")
      setLoading(true)
      await signin(email, password)
      history.push("/ProfilePage")
    } catch(error) {
      setError(`Failed to sign in: ${error.message}`)
      console.log(error.message)
    }
    setLoading(false)
    setEmail("")
    setPassword("")
  }

  return(
    <Form>
      <Form.Title>Sign in</Form.Title>
      {error && <Form.Error>{error}</Form.Error>}
      <Form.Base onSubmit={handleSubmit}>
        <Form.Input
          required
          value={email}
          type="email" 
          placeholder="Email Address"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <Form.Input
          required
          value={password}
          autoComplete="off"
          type="password" 
          placeholder="Your Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Form.Submit disabled={isInvalid || loading} type="submit">
          Sign In
        </Form.Submit>
        <Form.Text>
          Don't have an account?
          <Form.Link to="SignUp">
            Sign up here.
          </Form.Link>
        </Form.Text>
        <Form.Text>
          Forgot Your Password?
          <Form.Link to="PasswordReset">
            Reset Password
          </Form.Link>
        </Form.Text>
      </Form.Base>
    </Form>
  )
}

export default SignIn