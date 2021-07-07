import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Form } from "../components"
import { auth, db } from "../firebase"

function SignUp() {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const history = useHistory()
  const isInvalid = displayName === '' || password === '' || email === '';
  
  function handleSignup(e){
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
      .then((result) => result.user.updateProfile({
          displayName: displayName,
          photoURL: 'https://gravatar.com/avatar/8e1741bcab7ec27915445c32a5af4d97?s=600&d=mp&r=pg'
        })
        .then(() => {
          const user = auth.currentUser
          db.collection("users").doc(user.uid).set({
            likes: [],
            bookmarks: [],
            comments: [],
            displayName: user.displayName,
            drafts: [],
            photoURL: user.photoURL,
            published: []
          })
        })
        .then(() => history.push('/ProfilePage'))
      )
      .catch((error) => {
        setEmail('');
        setPassword('');
        setError(error.message);
      }) 
 }

  return(
    <Form>
      <Form.Title>Sign Up</Form.Title>
      
      <Form.Base onSubmit={handleSignup}>
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
          disabled={isInvalid}
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