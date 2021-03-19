import React, { useState, useEffect } from "react"
import firebase, {auth} from "../firebase"


const UserContext = React.createContext()
function UserContextProvider(props) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [doc, setDocs] = useState([])

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  
  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signout() {
    return auth.signOut()
  }

  function rstPass(email) {
    return auth.sendPasswordResetEmail(email)
  }
  function getDoc() {
     const db = firebase.firestore()
      db
      .collection("post")
      .onSnapshot((snapshot) => {
        setDocs(snapshot.docs.map(doc => doc.data()))
      })
  }  
  
  function post(blog) {
      const db = firebase.firestore()
      db
      .collection("post")
      .add(blog)
      .then((docRef) => {
        console.log(docRef.id)
        return db.collection("post").doc(docRef.id).update({
          id: docRef.id
        })
      })
    } 
    
  function updateUser(displayName){
    firebase.auth().currentUser.updateProfile({
      displayName: displayName,
      photoURL: "https://unsplash.com/photos/I0fDR8xtApA"
    })
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(curUser => {
        setUser(curUser)
        setLoading(false)
    })
    return unsubscribe
  }, [])
  const value = {
    user,
    signin,
    signup,
    signout,
    rstPass,
    post,
    data,
    getDoc,
    doc,
    updateUser
  }
  return (
    <UserContext.Provider value={value}>
      {!loading && props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}