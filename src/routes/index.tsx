import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthHandler } from '../components/auth-handler'
import { HomePageContainer, LoginPageContainer, RegisterPageContainer } from '../pages'


function Router() {
  return (
    <Switch>

      <Route exact path={'/login'} component={LoginPageContainer} />

      <Route path={'/register'} component={RegisterPageContainer} />

      <AuthHandler>

        <Suspense fallback={<h1>Loading...</h1>}>

          <Route exact path={'/'} render={withProps(HomePageContainer)} />

          <Route path={'/incomes'} render={withProps(lazy(() => import('../pages/incomes')))} />

          <Route path={'/outcomes'} render={withProps(lazy(() => import('../pages/outcomes')))} />

          <Route path={'/templates'} render={withProps(lazy(() => import('../pages/templates')))} />

          <Route path={'/profile'} render={withProps(lazy(() => import('../pages/profile')))} />

          <Route path={'/addMovement'} render={withProps(lazy(() => import('../pages/addRecordDialog')))} />

        </Suspense>

      </AuthHandler>

    </Switch>
  )
}

const withProps = (Component: any) => {
  return (props: any) => <Component {...props} />
}

export default Router