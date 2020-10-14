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
        IdleService.setIdleCallback(this.logoutFromIdle)
  
        if (TokenService.hasAuthToken()) {
            IdleService.regiserIdleTimerResets()
            TokenService.queueCallbackBeforeExpiry(() => {
                AuthApiService.postRefreshToken()
            })
        }
    }
  
    componentWillUnmount() {
        IdleService.unRegisterIdleResets()
        TokenService.clearCallbackBeforeExpiry()
    }
  
    logoutFromIdle = () => {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
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