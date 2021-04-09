import React, { useState, useEffect } from "react"
import firebase, {auth} from "../firebase"


const UserContext = React.createContext()
function UserContextProvider(props) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [doc, setDocs] = useState([])
  const [userLog, setUserLog] = useState([])

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

  function getUserLog() {
    const db = firebase.firestore()
    const docRef = db.collection("users").doc(user.uid)
      docRef.get().then((doc) => {
        if (doc.exists) {
          setUserLog(doc.data())
        } else {
          setUserLog("No data")
        }
      }).catch((error) => {
        console.log(error)
      })
  }
  
  function post(coll, blog) {
    const db = firebase.firestore()
    db
    .collection(coll)
    .add(blog)
    .then((docRef) => {
      return db.collection(coll).doc(docRef.id).update({
        id: docRef.id
      })
    })
    .catch((error) => {
    console.error("Error adding document: ", error.message)
  })
  } 

  function reuploadData() {
    const db = firebase.firestore()
    db
    .collection("blogs")
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach(doc => {
          db.collection("blogscopy").add(doc.data())
          .then((docRef) => {
            return db.collection("blogscopy").doc(docRef.id).update({
              id: docRef.id
            })
          })
        })
      })
  }
  
  function deleteBlog(coll, id) {
    const db = firebase.firestore()
    db.collection(coll).doc(id).delete()
  }
  
  function updateDoc(coll, obj, id) {
    const db = firebase.firestore()
    db.collection(coll).doc(id).update(obj)
  }

  function updateUser(displayName){
    firebase.auth().currentUser.updateProfile({
      displayName: displayName,
      photoURL: "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
    })
    .then((e) => console.log(e))
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
      bookmarks: [],
      likes: [],
      comments: []
    })
    .catch((error) => {
      console.error("Error writing document: ", error)
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
    updateDoc,
    reuploadData,
    getUserLog,
    userLog
  }
  return (
    <UserContext.Provider value={value}>
      {!loading && props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}