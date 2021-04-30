import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import {TabView} from "."
import BlogList from "./blog-list"

export default function UserBlogs() {
  const { userLog, doc, user } = useContext(UserContext)
  const userBlogs = doc.filter(blog => blog.authorId === user.uid)
  return (
    <TabView>
      <TabView.Frame>
        <TabView.Tabs>
          <TabView.Tab name="published">Published</TabView.Tab>
          <TabView.Tab name="drafts">Drafts</TabView.Tab>
          <TabView.Tab name="comments">Comments</TabView.Tab>
        </TabView.Tabs>
        <TabView.Title />
        <BlogList blogs={userBlogs} />
      </TabView.Frame>
    </TabView>
  )
}