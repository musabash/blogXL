import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import {TabView} from "."
import { userBlogsTabs as tabs} from "./menu-lists"

export default function UserBlogs() {
  const { user } = useContext(UserContext)
  const qOne = {where: "authorId", condition: "==", val: user.uid}

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
      <TabView.Body userId={user.uid} qOne={qOne} />
    </TabView>
  )
}