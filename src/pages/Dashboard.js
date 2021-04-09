import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext"


export default function Dashboard() {
  
  const { userLog } = useContext(UserContext)
  return (
    <div>
      <button onClick={() => console.log(userLog)}>musa</button>
    </div>
  )
}
 