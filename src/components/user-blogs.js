import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import {TabView} from "."
import { db } from "../firebase"
import { userBlogsTabs as tabs} from "./menu-lists"
import { useDocument } from "../hooks"

export default function UserBlogs() {
  const [blogs, setBlogs] = useState([])
  const { user } = useContext(UserContext)
  const userLog = useDocument("users", user.uid)


  useEffect(() => {
    let unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
      setBlogs(snapshot.docs.map(doc => doc.data()).filter(blog => blog.authorId === user.uid))
    })
    return (() => unsubscribe())
  }, [])

  return (
    <TabView tabs={tabs}>
      <TabView.Frame>
        <TabView.Tabs>
          {tabs.map((tab, index) => (
            <TabView.Tab id={index} key={tab.name} name={tab.name} def={tab.def}>{tab.title}</TabView.Tab>
          ))}
        </TabView.Tabs>
        <TabView.Slider />
      </TabView.Frame>
      <TabView.Body blogs={blogs} userLog={userLog}/>
    </TabView>
  )
}