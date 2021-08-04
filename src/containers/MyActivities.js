import React from "react"
import {Dashboard} from "../components"
import { dashboardMenuList } from "../components/menu-lists"

export function MyActivities() {
  
  return (
    <div>
      <Dashboard>
        <Dashboard.Frame>
          <Dashboard.Hamburger/>
          <Dashboard.Menu>
            <Dashboard.MenuList>
              {dashboardMenuList.map((item) => (
                <Dashboard.MenuItem key={item.name}>
                  <Dashboard.MenuLink item={item}>{item.title}</Dashboard.MenuLink>
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