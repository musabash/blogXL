import React, {useContext, useState, useEffect, useRef} from "react"
import { UserContext } from "../contexts/UserContext"
import ProfilePicture from "../components/profile-picture";
import { Feed } from "../components";
import { db } from "../firebase";

const ProfilePage = () => {
  const {user, updateDoc, uploadPic, picLoadingPercent, updateUser} = useContext(UserContext)
  const [file, setFile] = useState("")
  const [userLog, setUserLog] = useState()
  const [doc, setDocument] = useState("")
  const inputFileRef = useRef(null)

  const handleClick = () => inputFileRef.current.click()

  useEffect(() => {
    let unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      setUserLog(snapshot.docs.filter(userLog => userLog.id === user.uid)[0].data())
    })
    return (() => unsubscribe())
  }, [])

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
          <button
            onClick={() => uploadPic(file)}
          >upload</button>
          {![0, 100].includes(picLoadingPercent) &&
            <div style={{background: "gray", width: "20%", height: "4px"}}>
              <div style={{background: "blue", height: "4px", width: `${picLoadingPercent}%`}}></div>
            </div>
          }
          <h2>{user.displayName}</h2>
          <h3>{user.email}</h3>
        </div>
      </div>
      {/* <button onClick={() => updateUser({photoURL: 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})}>update user</button> */}
      <button onClick={() =>updateDoc("users", {photoURL: user.photoURL}, user.uid)}>update doc</button>
      <button onClick={() => updateUser({photoURL: ""})}>update user</button>
      <button onClick={() => console.log(user.photoURL)}>{doc.id}</button>
      <Feed>
        <Feed.Trending>
          <Feed.Title>Popular on BlogXL</Feed.Title>
        </Feed.Trending>
      </Feed>
    </div>
  )
};

export default ProfilePage