import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import WorkoutContext from '../../contexts/WorkoutContext'
import './Header.css'

export default class Header extends Component {
    static contextType = WorkoutContext

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
        this.context.setIsLoggedIn(false)
    }

    renderLogoutLink() {
        return (
            <div className='Header_logged-in'>

                <Link
                    to='/myworkouts'>
                    myWorkouts
                </Link>
                |
                <Link
                    to='/newworkout'>
                    newWorkout
                </Link>
                |
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <div>
                <Link
                    to='/register'>
                    Register
                </Link>
                </div>
                |
                <div>
                <Link
                    to='/login'>
                    Login
                </Link>
                </div>
            </div>
        )
    }

    render() {
        return (
            <nav className='Header'>
                <h1>
                    <Link to='/'>
                        benchMark
                    </Link>
                </h1>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </nav>            
        )
    }
}