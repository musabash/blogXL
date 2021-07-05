import React, { useState } from "react"
import { Form } from "../components"
import { auth } from "../firebase"

function PasswordReset() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const isInvalid = email === ''
  
  function sendResetEmail(e) {
    e.preventDefault()
    setLoading(true)
    auth.sendPasswordResetEmail(email)
    .then(() => {
      setEmailSent("An email has been sent. Check your inbox for further details.")
      setLoading(false)
      setEmail("")
    })
    .catch((error) => {
      setError({msg: error.message, email: email})
      setLoading(false)
      setEmail("")
    })
  }

  return (
    loading ? <p>Loading...</p> : 

    <Form>
      <Form.Title>Password Reset</Form.Title>
      {emailSent && <Form.Success className="success">{emailSent}</Form.Success>}
      {error && <Form.Error>{error.msg} <Form.Text colour="#efefef">{error.email}</Form.Text></Form.Error>}
      <Form.Base onSubmit={sendResetEmail}>
        <Form.Input
          required
          value={email}
          type="email" 
          placeholder="Email Address"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <Form.Submit disabled={isInvalid} type="submit">
          Send me a reset link
        </Form.Submit>
        
        <Form.Text>
          &larr; Back to
          <Form.Link to="/">
            Sign In page
          </Form.Link>
        </Form.Text>
      </Form.Base>
    </Form>
  )
}
export default PasswordReset