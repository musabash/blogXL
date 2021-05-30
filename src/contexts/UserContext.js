import React, { useState, useEffect } from "react"
import firebase, {auth, storage} from "../firebase"


const UserContext = React.createContext()
function UserContextProvider(props) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [doc, setDocs] = useState([])
  const [userLog, setUserLog] = useState([])
  const [picLoadingPercent, setPicLoadingPercent] = useState(0)
  const [error, setError] = useState("")

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
  
  function uploadPic(file) {
    console.log(file)
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('images/' + user.uid).put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPicLoadingPercent(progress);
        // switch (snapshot.state) {
        //   case firebase.storage.TaskState.PAUSED:
        //     console.log('Upload is paused');
        //     break;
        //   case firebase.storage.TaskState.RUNNING:
        //     console.log('Upload is running');
        //     break;
        //   default:
        //     console.log(snapshot.state);
        // }
      }, 
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            setError("unauthorised request")
            break;
          case 'storage/canceled':
            setError("canceled request")
            break;
          case 'storage/unknown':
            setError("unknown file")
            break;
          default:
            setError('')
        }
      }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUser({photoURL: downloadURL})
        });
      }
    );
  }

  function deleteBlog(coll, id) {
    const db = firebase.firestore()
    db.collection(coll).doc(id).delete()
  }
  
  function updateDoc(coll, obj, id) {
    const db = firebase.firestore()
    db.collection(coll).doc(id).update(obj)
  }

  function updateUser(obj){
    firebase.auth().currentUser.updateProfile(obj)
    .then(() => console.log("profile updated"))
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
    userLog,
    uploadPic,
    picLoadingPercent
  }
  return (
    <UserContext.Provider value={value}>
      {!loading && props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}