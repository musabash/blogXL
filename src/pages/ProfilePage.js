import React, {useContext, useState, useRef} from "react"
import { UserContext } from "../contexts/UserContext"
import {ProfilePicture} from "../components";
import firebase, { storage } from "../firebase";
import LoadingBar from "../components/loading-bar";
import { useAuthListener } from "../hooks";

export const ProfilePage = () => {
  const [file, setFile] = useState("")
  const [error, setError] = useState("")
  const [picLoadingPercent, setPicLoadingPercent] = useState(0)
  const inputFileRef = useRef(null)
  const {updateUser, updateDoc} = useContext(UserContext)
  const { user } = useAuthListener()
  // const userLog = useSnapshot('users', user.uid)
  const errorCodes = {
    unauthorized: "unauthorised request",
    canceled: "canceled request",
    unknown: "unknown file"
  }

  const handleClick = () => inputFileRef.current.click()

  function uploadPic(file) {
    const metadata = {contentType: 'image/jpeg'}
    const uploadTask = storage.ref().child('images/' + user.uid).put(file, metadata)
    uploadTask
    .on(firebase.storage.TaskEvent.STATE_CHANGED, 
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPicLoadingPercent(progress);
      }, 
      (err) => {
        err && setError(errorCodes[error.code.slice(8)])
        }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUser({photoURL: downloadURL})
          updateDoc("users", {photoURL: downloadURL}, user.uid)
          setFile("")
          setPicLoadingPercent(0)
        });
      }
    );
  }

  return (
    <div className="profile-page__container">
      <div>
        <ProfilePicture
          id={user ? user.uid : "guest"}
          handleClick={handleClick}
          subText={true}
          borderRadius="5%"
          size="10em"
        />
        <input
          style={{visibility: 'hidden'}}
          type="file"
          ref={inputFileRef}
          name="profilePic"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div>
          {file && <LoadingBar picLoadingPercent={picLoadingPercent} file={file}/>
          }
          <button disabled={!file || ![0, 100].includes(picLoadingPercent)}
            onClick={() => uploadPic(file)}
          >upload</button>
          {error && <h3>{error}</h3>}
          <h3><span>Username: </span>{user.displayName}</h3>
          <h3><span>Email address: </span>{user.email}</h3>
          {/* {userLog ? <h3>{userLog.bookmarks.length} Bookmarks</h3> : null} */}
        </div>
      </div>
    </div>
  )
};

