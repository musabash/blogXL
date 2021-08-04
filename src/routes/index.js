import React from "react"
import { Switch, Route } from "react-router-dom"
import {SignIn, SignUp, ProfilePage, Create, Blogs, PageNotFound, MainFeed, PublicFeed, PasswordReset} from "../pages"
import {MyActivities} from "../containers"
import {BlogDetails, PublicRoute, PrivateRoute}  from "../components"
import {useAuthListener} from "../hooks"
import * as ROUTES from '../constants/routes';
import { Container } from "./routes"

function MainRoutes() {
  const { user } = useAuthListener()
  return (
    <Container>
      <Switch>
        <PublicRoute user={user} exact path={ROUTES.PUBLIC_FEED} restrictedPath={ROUTES.MAIN_FEED}>
          <PublicFeed/>
        </PublicRoute>
        <PublicRoute user={user} exact path={ROUTES.SIGN_IN} restrictedPath={ROUTES.MAIN_FEED}>
          <SignIn />
        </PublicRoute>
        <PublicRoute user={user} exact path={ROUTES.SIGN_UP} restrictedPath={ROUTES.MAIN_FEED}>
          <SignUp />
        </PublicRoute>
        <PrivateRoute exact path={ROUTES.MAIN_FEED} user={user}>
          <MainFeed />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.PROFILE_PAGE} user={user}>
          <ProfilePage />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.CREATE} user={user}>
          <Create />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.MY_ACTIVITIES} user={user}>
          <MyActivities />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.BLOGS} user={user}>
          <Blogs />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTES.BLOG} user={user}>
          <BlogDetails />
        </PrivateRoute>
        <Route exact path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
        <Route component={PageNotFound} />
      </Switch>
    </Container>
  )
}

export default MainRoutes;