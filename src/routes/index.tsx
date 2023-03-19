import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthHandler } from '../components/auth-handler'
import { HomePage, LoginPage, RegisterPage } from '../pages'


function Router() {
  return (
    <Switch>

      <Route exact path={'/login'} component={LoginPage} />

      <Route path={'/register'} component={RegisterPage} />

      <AuthHandler>

        <Suspense fallback={<h1>Loading...</h1>}>

          <Route exact path={'/'} render={withProps(HomePage)} />

          <Route path={'/incomes'} render={withProps(lazy(() => import('../pages/incomes')))} />

          <Route path={'/outcomes'} render={withProps(lazy(() => import('../pages/outcomes')))} />

          <Route path={'/templates'} render={withProps(lazy(() => import('../pages/templates')))} />

          <Route path={'/profile'} render={withProps(lazy(() => import('../pages/profile')))} />

          <Route path={'/add-movement'} render={withProps(lazy(() => import('../components/add-record-modal')))} />

        </Suspense>

      </AuthHandler>

    </Switch>
  )
}

const withProps = (Component: any) => {
  return (props: any) => <Component {...props} />
}

export default Router