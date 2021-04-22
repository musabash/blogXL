import {useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import { Accordion } from "."


export default function DashboardActiveElement({toggleActive}) {
  const { userLog, doc } = useContext(UserContext)

  return (
    <Accordion.Frame>
        {userLog[toggleActive].length === 0 ? `No ${toggleActive} yet` : userLog[toggleActive].map(elm => {
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
  )
}