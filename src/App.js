import React, { useContext } from "react"
import { UserContext } from "./contexts/UserContext"
import { Switch, Route } from "react-router-dom"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Header from "./components/Header"
import PasswordReset from "./components/PasswordReset"
import ProfilePage from "./pages/ProfilePage"
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"
import Dashboard from "./pages/Dashboard"

function App() {
  // const user = useContext(UserContext)
  return (
    <div className="app"> 
      <Header />
      <Switch>
        <PublicRoute exact path="/" restricted={true} component={SignIn} />
        <PrivateRoute path="/ProfilePage" component={ProfilePage}/>
        <PrivateRoute path="/Dashboard" component={Dashboard}/>
        <Route path="/SignUp"><SignUp /></Route>
        <Route path="/PasswordReset"><PasswordReset /></Route>
      </Switch>
    </div>
  )
}

export default App;