import React from "react"
import { Switch, Route } from "react-router-dom"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import PasswordReset from "../pages/PasswordReset"
import ProfilePage from "../pages/ProfilePage"
import Create from "../pages/Create"
import PrivateRoute from "../components/PrivateRoute"
import PublicRoute from "../components/PublicRoute"
import MyActivities from "../containers/MyActivities"
import Blogs from "../pages/Blogs"
import BlogDetails  from "../components"
import {useAuthListener} from "../hooks"
import PageNotFound from "../pages/page-not-found"

function MainRoutes() {
  const { user } = useAuthListener()
  return (
    <div className="content">
      <Switch>
        <PublicRoute
          user={user}
          exact path="/"
          restricted={true}
          component={SignIn}
        />
        <PrivateRoute
          exact path="/ProfilePage"
          user={user}
          component={ProfilePage}
        />
        <PrivateRoute 
          path="/create"
          user={user} 
          component={Create}
        />
        <PrivateRoute
          path="/MyActivities"
          user={user}
          component={MyActivities}
        />
        <PrivateRoute
          exact path="/blogs"
          user={user}
          component={Blogs}
        />
        <PublicRoute
          path="/PasswordReset"
          user={user}
          restricted={true}
          component={PasswordReset}
        />
        <PublicRoute 
          exact path="/Signup"
          user={user}
          restricted={true}
          component={SignUp}
        />
        <PrivateRoute
          user={user}
          exact path="/blogs/:id"
          component={BlogDetails}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
}

export default MainRoutes;