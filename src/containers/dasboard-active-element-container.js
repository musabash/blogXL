import { useState, useEffect } from "react"
import { Accordion } from "../components"
import { useAuthListener } from "../hooks"
import { db } from "../firebase"

export function DashboardActiveElement({name}) {
  const {user} = useAuthListener()
  const [blogs, setBlogs] = useState([])

  const getBlogs = async() => {
    try {
      const array = await db.collection("users").doc(user.uid).get().then((doc) => doc.data()[name])
      await db.collection("blogs").where("id", "in", ["", ...array]).get().then((querySnapshot) => {
        setBlogs(querySnapshot.docs.map(elm => elm.data()))
      }) 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("dashboardActiveElement")
    name && getBlogs()
  }, [name])

  return (
    blogs ? <Accordion.Frame>
        {blogs.length === 0 ? `No ${name} yet` : blogs.map(blog =>
          <Accordion.Item key={blog.id}>
            <Accordion.Header>
              {blog.title} <span>by {blog.author}</span>
            </Accordion.Header>
            <Accordion.Body to={!blog.deleted ? `blogs/${blog.id}` : "/BlogDeleted"}>
              {blog.body.slice(0, 25)} ...
            </Accordion.Body>
          </Accordion.Item>
        )}
    </Accordion.Frame> : 
    <p>Loading...</p>
  )
}