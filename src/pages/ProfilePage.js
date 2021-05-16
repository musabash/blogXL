import React, {useContext, useState, useEffect, useRef} from "react"
import { UserContext } from "../contexts/UserContext"
import ProfilePicture from "../components/profile-picture";

const ProfilePage = () => {
  const {user, updateUser, getUserLog, uploadPic, picLoadingPercent} = useContext(UserContext)
  const [file, setFile] = useState("")
  const inputFileRef = useRef(null)

  const handleClick = () => inputFileRef.current.click()

  useEffect(() => {
    getUserLog()
  }, [])
  return (
    <div className="profile-page__container">
      <div>
        <ProfilePicture photoURL={user.photoURL} handleClick={handleClick} borderRadius="5%" size="100px"/>
        <input style={{visibility: 'hidden'}} type="file" ref={inputFileRef} name="profilePic" onChange={(e) => setFile(e.target.files[0])}/>
        <div>
        <button onClick={() => uploadPic(file)}>upload</button>
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
      
    </div>
  )
};

export default ProfilePage