import {useContext} from "react"
import { Link } from "react-router-dom"
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
            <Link to={`blogs/${blog.id}`}>
              <Accordion.Body>
                {blog.body[0].slice(0, 25)} ...
              </Accordion.Body>
            </Link>
          </Accordion.Item>
          )} 
        )}
    </Accordion.Frame>
  )
}