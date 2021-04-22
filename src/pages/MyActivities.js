import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import { Dashboard, Accordion } from "../components"
import UserBookmarks from "../components/dasboard-active-element"


export default function MyActivities() {
  
  const { userLog, doc } = useContext(UserContext)
  // const [blogs, setBlogs] = useState()
  return (
    <div>
      <Dashboard>
        <Dashboard.Frame>
          <Dashboard.MenuButton/>
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

      {/* <Accordion>
        <Accordion.Title>My Activities</Accordion.Title>
        <Accordion.Frame>
          {["likes", "bookmarks", "comments"].map(act => (
            <Accordion.Item key={act}>
              <Accordion.Header>
                {act}
              </Accordion.Header>
              <Accordion.Body>
                <Accordion.Frame>
                  {userLog[act].length === 0 ? `No ${act} yet!` : userLog[act].map(elm => {
                    let blog = doc.filter(blog => blog.id === elm)[0]
                    return (
                    <Accordion.Item key={elm}>
                      <Accordion.Header>
                        {blog.title} by {blog.author}
                      </Accordion.Header>
                      <Accordion.Body>
                        {blog.body[0].slice(0, 25)} ...
                      </Accordion.Body>
                    </Accordion.Item>
                    )} 
                  )}
                </Accordion.Frame>
                
              </Accordion.Body>
            </Accordion.Item>
            )
          )}
        </Accordion.Frame>
      </Accordion> */}
    </div>
  )
}
 