import React, {useContext} from "react"
import {Redirect, Route} from "react-router-dom"
import { UserContext } from "../contexts/UserContext"


const PublicRoute = ({component: Component, restricted, ...rest}) => {
  const {user} = useContext(UserContext)  

  return (
    <Route {...rest} render={props => (
      user && restricted ?
      <Redirect to="/ProfilePage" /> :
      <Component {...props} />
    )}
    ></Route>
  )
}

export default PublicRoute