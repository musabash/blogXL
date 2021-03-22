import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext"


export default function Dashboard() {
  const { updateUser } = useContext(UserContext)
  return (
    <div>
      <button onClick={updateUser("Musa Bas")}>musa</button>
    </div>
  )
}
 