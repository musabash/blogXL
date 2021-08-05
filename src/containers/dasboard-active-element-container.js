import { useState, useEffect } from "react"
import { Accordion } from "../components"
import useDocument from "../hooks/useDocument"
import { useAuthListener } from "../hooks"
import useCollection from "../hooks/use-collection"


export function DashboardActiveElement({name}) {
  const [data, setData] = useState()
  const {user} = useAuthListener()
  const blogs = useCollection("blogs")
  const userLog  = useDocument("users", user.uid)

  useEffect(() => {
    userLog && setData(userLog[name])
  }, [userLog, name])

  return (
    data ? <Accordion.Frame>
        {data.length === 0 ? `No ${name} yet` : data.map(elm => {
          let blog = blogs.filter(blog => blog.id === elm)[0]
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