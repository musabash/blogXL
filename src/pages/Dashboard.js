import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext"


export default function Dashboard() {
  const {post, getDoc} = useContext(UserContext)
  return (
    <div>
      <button onClick={getDoc}>musa</button>
      <button onClick={post}>post</button>
    </div>
  )
}
