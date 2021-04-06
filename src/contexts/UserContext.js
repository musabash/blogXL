import React, { useState, useEffect } from "react"
import firebase, {auth} from "../firebase"


const UserContext = React.createContext()
function UserContextProvider(props) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
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

  function getDoc(coll) {
     const db = firebase.firestore()
     db
      .collection(coll)
      .onSnapshot((snapshot) => {
        setDocs(snapshot.docs.map(doc => doc.data()))
      }, (error) => {console.log(error)})
  }  
  
  function post(blog) {
    const db = firebase.firestore()
    db
    .collection("post")
    .add(blog)
    .then((docRef) => {
      return db.collection("post").doc(docRef.id).update({
        id: docRef.id
      })
    })
  } 
  
  function deleteBlog(id) {
    const db = firebase.firestore()
    db.collection("post").doc(id).delete()
  }
  
  function updateDoc(obj, id) {
    const db = firebase.firestore()
    db.collection("post").doc(id).update(obj)
  }

  function updateUser(displayName){
    firebase.auth().currentUser.updateProfile({
      displayName: displayName,
      photoURL: "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
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
    getDoc,
    doc,
    updateUser,
    deleteBlog,
    updateDoc
  }
  return (
    <UserContext.Provider value={value}>
      {!loading && props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}