import React, { useState, useEffect } from "react"
import firebase, {db, storage} from "../firebase"
import { useAuthListener } from "../hooks"

const UserContext = React.createContext()
function UserContextProvider(props) {
  const [loading, setLoading] = useState(true)
  const [doc, setDocs] = useState([])
  const [userLog, setUserLog] = useState([])
  const [picLoadingPercent, setPicLoadingPercent] = useState(0)
  const [error, setError] = useState("")
  const {user} = useAuthListener()

  function getCollection(coll) {
    db
    .collection(coll)
    .onSnapshot((snapshot) => {
      setDocs(snapshot.docs.map(doc => doc.data()))
    }, (error) => {console.log(error)})
  }

  async function getDocument(coll, docId) {
    const docRef = db.collection(coll).doc(docId)
    return docRef.get().then((doc) => doc.data())
    .catch((error) => {
        console.log("Error getting document:", error);
    })
  }

  function getUserLog() {
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

  function reuploadData() {
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
    const storageRef = storage.ref();
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
    db.collection(coll).doc(id).delete()
  }
  
  function updateDoc(coll, obj, id) {
    db.collection(coll).doc(id).update(obj)
  }

  function changeFieldValue(coll, id, obj) {
    db.collection(coll).doc(id).update({
      [obj.delField]: firebase.firestore.FieldValue.delete(),
      [obj.newField]: obj.newFieldValue
    })
  }

  function updateUser(obj){
    const userRef = firebase.auth().currentUser
    userRef.updateProfile(obj)
    .catch((error) => {
      console.error("Error writing document: ", error)
    })
  }
  
  useEffect(() => {
        setLoading(false)
    }, [])
  const value = {
    user,
    getDocument,
    getCollection,
    doc,
    updateUser,
    deleteBlog,
    updateDoc,
    reuploadData,
    getUserLog,
    userLog,
    uploadPic,
    picLoadingPercent,
    changeFieldValue
  }
  return (
    <UserContext.Provider value={value}>
      {loading ? <p>Loading...</p> : props.children}
      {error && <p>{error}</p>}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}