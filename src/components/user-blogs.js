import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import {TabView} from "."
import { userBlogsTabs as tabs} from "./menu-lists"
import { useDocument } from "../hooks"
import useQuery from "../hooks/useQuery"

export default function UserBlogs() {
  const { user } = useContext(UserContext)
  const userLog = useDocument("users", user.uid)
  const blogs = useQuery("blogs", "authorId", "==", user.uid)

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