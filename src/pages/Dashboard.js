import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext"


export default function Dashboard() {
  
  const { updateUser, reuploadData } = useContext(UserContext)
  return (
    <div>
      <button onClick={reuploadData}>musa</button>
    </div>
  )
}
 