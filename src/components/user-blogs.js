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

  const tabs = [
    {
      name: "published",
      title: "Published"
    },
    {
      name: "drafts",
      title: "Drafts"
    },
    {
      name: "comments",
      title: "Comments"
    }
  ]

  return (
    <TabView tabs={tabs}>
      <TabView.Frame>
        <TabView.Tabs>
          {tabs.map((tab, index) => (
            <TabView.Tab id={index} key={tab.name} name={tab.name}>{tab.title}</TabView.Tab>
          ))}
        </TabView.Tabs>
        <TabView.Slider />
        <TabView.Body blogs={blogs} />
      </TabView.Frame>
    </TabView>
  )
}