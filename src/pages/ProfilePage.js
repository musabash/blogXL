import React, {useContext, useState, useEffect, useRef} from "react"
import { UserContext } from "../contexts/UserContext"
import ProfilePicture from "../components/profile-picture";
import { Feed } from "../components";
import firebase, { db, storage } from "../firebase";

const ProfilePage = () => {
  const [file, setFile] = useState("")
  const [userLog, setUserLog] = useState()
  const [doc, setDocument] = useState("")
  const [error, setError] = useState("")
  const [picLoadingPercent, setPicLoadingPercent] = useState(0)
  const inputFileRef = useRef(null)
  const {user, updateDoc, updateUser} = useContext(UserContext)

  const handleClick = () => inputFileRef.current.click()

  useEffect(() => {
    let unsubscribe = db.collection('users')
                        .onSnapshot((snapshot) => {
                          setUserLog(snapshot.docs.filter(userLog => userLog.id === user.uid)[0].data())
                        })
    return (() => unsubscribe())
  }, [])

  function uploadPic(file) {
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = storage.ref();
    const uploadTask = storageRef.child('images/' + user.uid).put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPicLoadingPercent(progress);
      }, 
      (error) => {
        const errorCodes = {
          unauthorized: "unauthorised request",
          canceled: "canceled request",
          unknown: "unknown file"
        }
        error && setError(errorCodes[error.code.slice(8)])
        }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUser({photoURL: downloadURL})
          setFile("")
        });
      }
    );
  }

  return (
    <div className="profile-page__container">
      <div>
        <ProfilePicture
          displayName={" "}
          photoURL={user.photoURL}
          handleClick={handleClick}
          borderRadius="5%" size="100px"
        />
        <input
          style={{visibility: 'hidden'}}
          type="file"
          ref={inputFileRef}
          name="profilePic"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div>
          <button disabled={!file}
            onClick={() => uploadPic(file)}
          >upload</button>
          {![0, 100].includes(picLoadingPercent) &&
            <div style={{background: "gray", width: "20%", height: "4px"}}>
              <div style={{background: "blue", height: "4px", width: `${picLoadingPercent}%`}}></div>
            </div>
          }
          <h3><span>Username: </span>{user.displayName}</h3>
          <h3><span>Email address: </span>{user.email}</h3>
        </div>
      </div>
      {/* <button onClick={() => updateUser({photoURL: 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})}>update user</button> */}
      {/* <button onClick={() =>updateDoc("users", {photoURL: user.photoURL}, user.uid)}>update doc</button>
      <button onClick={() => updateUser({photoURL: ""})}>update user</button>
      <button onClick={() => console.log(user.photoURL)}>{doc.id}</button> */}
    </div>
  )
};

export default ProfilePage

