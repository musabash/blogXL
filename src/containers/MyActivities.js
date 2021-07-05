import {Dashboard} from "../components"

export default function MyActivities() {

  const dashboardMenuList = [
    {
      name: "blogs",
      title: "Your Blogs"
    },
    {
      name: "bookmarks",
      title: "Blogs You Bookmarked"
    },
    {
      name: "recent",
      title: "Your Recent Views"
    },
    {
      name: "likes",
      title: "Blogs You Liked"
    },
    {
      name: "comments",
      title: "Blogs You Commented on"
    }
  ]
  
  return (
    <div>
      <Dashboard>
        <Dashboard.Frame>
          <Dashboard.Hamburger/>
          <Dashboard.Menu>
            <Dashboard.MenuList>
              {dashboardMenuList.map((item) => (
                <Dashboard.MenuItem>
                  <Dashboard.MenuLink name={item.name}>{item.title}</Dashboard.MenuLink>
                </Dashboard.MenuItem>
              ))}
            </Dashboard.MenuList> 
          </Dashboard.Menu>
        </Dashboard.Frame>
        <Dashboard.Frame>
          <Dashboard.Title></Dashboard.Title>
          <Dashboard.Item />
        </Dashboard.Frame>
      </Dashboard>
    </div>
  )
}