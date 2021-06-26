import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import {TabView} from "."
import { db } from "../firebase"

export default function UserBlogs() {
  const [blogs, setBlogs] = useState([])
  const { user } = useContext(UserContext)


  useEffect(() => {
    let unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
      setBlogs(snapshot.docs.map(doc => doc.data()).filter(blog => blog.authorId === user.uid))
    })
    return (() => unsubscribe())
  }, [])

  return (
    <TabView>
      <TabView.Frame>
        <TabView.Tabs>
          <TabView.Tab name="published">Published</TabView.Tab>
          <TabView.Tab name="drafts">Drafts</TabView.Tab>
          <TabView.Tab name="comments">Comments</TabView.Tab>
        </TabView.Tabs>
        <TabView.Body blogs={blogs} />
      </TabView.Frame>
    </TabView>
  )
}