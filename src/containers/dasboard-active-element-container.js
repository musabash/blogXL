import {useContext, useState, useEffect} from "react"
import { UserContext } from "../contexts/UserContext"
import { Accordion } from "../components"
import useDocument from "../hooks/useDocument"


export default function DashboardActiveElement({toggleActive}) {
  const [data, setData] = useState()
  const { user, doc } = useContext(UserContext)
  const userLog  = useDocument("users", user.uid)

  useEffect(() => {
    userLog && setData(userLog[toggleActive])
  }, [userLog, toggleActive])

  return (
    data ? <Accordion.Frame>
        {console.log("rendered")}
        {data.length === 0 ? `No ${toggleActive} yet` : data.map(elm => {
          let blog = doc.filter(blog => blog.id === elm)[0]
          return (
          <Accordion.Item key={elm}>
            <Accordion.Header>
              {blog.title} by {blog.author}
            </Accordion.Header>
              <Accordion.Body to={`blogs/${blog.id}`}>
                {blog.body.slice(0, 25)} ...
              </Accordion.Body>
          </Accordion.Item>
          )} 
        )}
    </Accordion.Frame> : 
    <p>Loading...</p>
  )
}