import React, {useContext, useState, useRef} from "react"
import { UserContext } from "../contexts/UserContext"
import {ProfilePicture} from "../components";
import firebase, { storage } from "../firebase";
import LoadingBar from "../components/loading-bar";
import { useAuthListener, useSnapshot } from "../hooks";

const ProfilePage = () => {
  const [file, setFile] = useState("")
  const [error, setError] = useState("")
  const [picLoadingPercent, setPicLoadingPercent] = useState(0)
  const inputFileRef = useRef(null)
  const {updateUser} = useContext(UserContext)
  const { user } = useAuthListener()
  const userLog = useSnapshot('users', user.uid)

  const handleClick = () => inputFileRef.current.click()

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
      (err) => {
        const errorCodes = {
          unauthorized: "unauthorised request",
          canceled: "canceled request",
          unknown: "unknown file"
        }
        err && setError(errorCodes[error.code.slice(8)])
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
          photoURL={user ? user.photoURL : "https://gravatar.com/avatar/8e1741bcab7ec27915445c32a5af4d97?s=600&d=mp&r=pg"}
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
          {file && <p>{file.name}/{file.size}KB</p>}
          {![0, 100].includes(picLoadingPercent) && <LoadingBar picLoadingPercent={picLoadingPercent}/>
          }
          {error && <h3>{error}</h3>}
          <h3><span>Username: </span>{user.displayName}</h3>
          <h3><span>Email address: </span>{user.email}</h3>
          {console.log(userLog, new Date().getTime())}
        </div>
      </div>
    </div>
  )
};

export default ProfilePage

