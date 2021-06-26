import {Dashboard} from "../components"

export default function MyActivities() {
  
  return (
    <div>
      <Dashboard>
        <Dashboard.Frame>
          <Dashboard.Hamburger/>
          <Dashboard.Menu>
            <Dashboard.MenuList>
              <Dashboard.MenuItem>
                <Dashboard.MenuLink name="blogs" >Your Blogs</Dashboard.MenuLink>
              </Dashboard.MenuItem>
              <Dashboard.MenuItem>
                <Dashboard.MenuLink name="bookmarks">Your Bookmarks</Dashboard.MenuLink>
              </Dashboard.MenuItem>
              <Dashboard.MenuItem>
                <Dashboard.MenuLink name="yourRecentViews">Your Recent Views</Dashboard.MenuLink>
              </Dashboard.MenuItem>
              <Dashboard.MenuItem>
                <Dashboard.MenuLink name="likes">You Liked</Dashboard.MenuLink>
              </Dashboard.MenuItem>
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