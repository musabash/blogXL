import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Form } from "../components"
import { auth } from "../firebase"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const history = useHistory()
  const isInvalid = password === '' | email === ''
  
  function handleSignIn(e){
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .then(() => history.push("/ProfilePage"))
      .catch((error) => {
        setEmail('')
        setPassword('')
        setError(error.message)
      });
  }
  return(
    <Form>
      <Form.Title>Sign in</Form.Title>
      {error && <Form.Error>{error}</Form.Error>}
      <Form.Base onSubmit={handleSignIn}>
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
        <Form.Submit disabled={isInvalid} type="submit">
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