import {TabView} from "."

export default function UserBlogs() {
  return (
    <TabView>
      <TabView.Frame>
        <TabView.Tabs>
          <TabView.Tab name="drafts">Drafts</TabView.Tab>
          <TabView.Tab name="published">Published</TabView.Tab>
          <TabView.Tab name="comments">Comments</TabView.Tab>
        </TabView.Tabs>
        <TabView.Title></TabView.Title>
      </TabView.Frame>
    </TabView>
  )
}