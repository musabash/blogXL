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
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
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
            path="/Dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            path="/Home"
            component={Home}
          />
          <Route path="/blogs/:id">
            <BlogDetails />
          </Route>
          <Route path="/SignUp"><SignUp /></Route>
          <Route path="/PasswordReset">
            <PasswordReset />
          </Route>
        </Switch>
      </div>
      
    </div>
  )
}

export default App;