import React, {useContext, useState, useEffect} from "react"
import { UserContext } from "../contexts/UserContext"
import { useHistory } from "react-router-dom"

const ProfilePage = () => {
  const {user, signout, updateUser, getUserLog} = useContext(UserContext)
  const [error, setError] = useState("")
  const history = useHistory()

  useEffect(() => {
    getUserLog()
  }, [])

  async function handleSignOut() {
    setError("")
    try {
      await signout()
      history.push("/")
    } catch(error) {
      setError(`Failed to sign out: ${error.message}`)
    }
  }
  
  return (
    <div>
      <div>
        <div
          style={{
            background:
                `url(${user.photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "100px",
            width: "100px"
          }}>
        </div>
        <div>
        <h2>{user.displayName}</h2>
        <h3>{user && user.email}</h3>
        </div>
      </div>
      {error && <h3 className="error">{error}</h3>}
      <button onClick={() => handleSignOut()}>Sign out</button>
      <button onClick={() => updateUser()}>USER</button>
    </div>
  )
};

export default ProfilePage