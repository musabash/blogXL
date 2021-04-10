import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import { Accordion } from "../components"


export default function Dashboard() {
  
  const { userLog, doc } = useContext(UserContext)
  return (
    <div>
      <Accordion>
        <Accordion.Title>Likes</Accordion.Title>
        <Accordion.Frame>
          {userLog.likes.map(elm => {
            let blog = doc.filter(blog => blog.id === elm)[0]
            return (
            <Accordion.Item key={elm}>
              <Accordion.Header>
                {blog.title} by {blog.author}
              </Accordion.Header>
              <Accordion.Body>
                {blog.body[0].slice(0, 25)} ...
              </Accordion.Body>
            </Accordion.Item>
            )} 
          )}
        </Accordion.Frame>
      </Accordion>
      <button onClick={() => console.log(userLog)}>musa</button>
    </div>
  )
}
 