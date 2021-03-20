import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext"


export default function Dashboard() {
  const {user, updateUser} = useContext(UserContext)
  return (
    <div>
      <button onClick={updateUser("herkul")}>musa</button>
    </div>
  )
}
