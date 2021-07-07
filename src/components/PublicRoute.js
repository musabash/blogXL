import React from "react"
import {Redirect, Route} from "react-router-dom"

const PublicRoute = ({user, component: Component, restricted, ...rest}) => {

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