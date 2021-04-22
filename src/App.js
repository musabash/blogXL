import React from "react"
import { Switch, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import PasswordReset from "./pages/PasswordReset"
import ProfilePage from "./pages/ProfilePage"
import Create from "./pages/Create"
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"
import Dashboard from "./pages/MyActivities"
import Blogs from "./pages/Blogs"
import BlogDetails from "./components/blog-details"

function App() {
  return (
    <div className="app"> 
      <Header />
      <div className="content">
        <Switch>
          <PublicRoute 
            exact path="/"
            restricted={true}
            component={SignIn}
          />
          <PrivateRoute
            path="/ProfilePage"
            component={ProfilePage}
          />
          <PrivateRoute 
            path="/create" 
            component={Create}
          />
          <PrivateRoute
            path="/MyActivities"
            component={Dashboard}
          />
          <PrivateRoute
            exact path="/blogs"
            component={Blogs}
          />
          <Route path="/PasswordReset">
            <PasswordReset />
          </Route>
          <Route path="/SignUp"><SignUp /></Route>
          <Route path="/blogs/:id" render={() => (<BlogDetails />)} />
        </Switch>
      </div>
      
    </div>
  )
}

export default App;