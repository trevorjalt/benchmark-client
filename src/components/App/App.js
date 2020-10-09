import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import LandingPage from '../../routes/LandingPage/LandingPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import MyWorkoutsPage from '../../routes/MyWorkoutsPage/MyWorkoutsPage'
import NewWorkoutPage from '../../routes/NewWorkoutPage/NewWorkoutPage'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import IdleService from '../../services/idle-service'
import './App.css'

class App extends Component {
  
  state = { 
      hasError: false,
      isLoggedIn: false,
    }
  
    static getDerivedStateFromError(error) {
      console.error(error)
      return { hasError: true }
    }

    componentDidMount() {
      /*
        set the function (callback) to call when a user goes idle
        we'll set this to logout a user when they're idle
      */
      IdleService.setIdleCallback(this.logoutFromIdle)
  
      /* if a user is logged in */
      if (TokenService.hasAuthToken()) {
        /*
          tell the idle service to register event listeners
          the event listeners are fired when a user does something, e.g. move their mouse
          if the user doesn't trigger one of these event listeners,
            the idleCallback (logout) will be invoked
        */
        IdleService.regiserIdleTimerResets()
  
        /*
          Tell the token service to read the JWT, looking at the exp value
          and queue a timeout just before the token expires
        */
        TokenService.queueCallbackBeforeExpiry(() => {
          /* the timoue will call this callback just before the token expires */
          AuthApiService.postRefreshToken()
        })
      }
    }
  
    componentWillUnmount() {
      /*
        when the app unmounts,
        stop the event listeners that auto logout (clear the token from storage)
      */
      IdleService.unRegisterIdleResets()
      /*
        and remove the refresh endpoint request
      */
      TokenService.clearCallbackBeforeExpiry()
    }
  
    logoutFromIdle = () => {
      /* remove the token from localStorage */
      TokenService.clearAuthToken()
      /* remove any queued calls to the refresh endpoint */
      TokenService.clearCallbackBeforeExpiry()
      /* remove the timeouts that auto logout when idle */
      IdleService.unRegisterIdleResets()
      /*
        react won't know the token has been removed from local storage,
        so we need to tell React to rerender
      */
      this.forceUpdate()
    }

    render() {
        return (
            <div>
                <header className='App__header'>
                    <Header />
                </header>
                <main className='App__main'>
                    {this.state.hasError && <p>Whoops. There was an error!</p>}
                    <Switch>
                      <Route
                        exact
                        path={'/'}
                        component={LandingPage}
                      />
                      <PublicOnlyRoute
                        path={'/register'}
                        component={RegistrationPage}
                      />
                      <PublicOnlyRoute
                        path={'/login'}
                        component={LoginPage}
                      />
                      <PrivateRoute
                        path={'/myworkouts'}
                        component={MyWorkoutsPage}
                      />
                      <PrivateRoute
                        path={'/newworkout'}
                        component={NewWorkoutPage}
                      />
                    </Switch>
                </main>
                <footer className='App__footer'>
                    <Footer />
                </footer>
            </div>
        )
    }
}

export default App