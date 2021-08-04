import React from "react"
import {Redirect, Route} from "react-router-dom"
import {SIGN_IN} from '../constants/routes';

export function PublicRoute({ user, restrictedPath, children, ...restProps }) {
  return (
    <Route {...restProps}
      render={() => {
        if (!user) {
            return children;
        }
        if (user) {
          return (
            <Redirect
              to={{
                pathname: restrictedPath,
              }}
            />
          );
        }
        return null;
      }}
    />
  )
}
  
export function PrivateRoute({ user, children, ...restProps }) {
  return (
    <Route {...restProps}
      render={({ location }) => {
        if (user) {
          return children;
        }
        if (!user) {
          return (
            <>
            {alert("Sorry, you need to sign in to view blogs.")}
            <Redirect
              to={{
                pathname: SIGN_IN,
                state: { from: location },
              }}
            />
            </>
          );
        }
        return null;
      }}
    />
  )
}