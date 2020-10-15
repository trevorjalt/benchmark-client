import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import WorkoutContext from '../../contexts/WorkoutContext'
import Logo from './images/benchmark-logo.png'
import LoginIcon from './images/login-icon.png'
import LogoutIcon from './images/logout-icon.png'
import MyWorkoutsIcon from './images/my-workouts-icon.png'
import NewWorkoutIcon from './images/new-workout-icon.png'
import RegisterIcon from './images/register-icon.png'
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
            <div className='Header__logged-in'>
                <Link
                    to='/myworkouts'
                    className='navItem'
                >
                    <img src={MyWorkoutsIcon} alt='My workouts link logo' className='navIcon'></img>
                    <p className='navItem__text'>myWorkouts</p>
                </Link>
                <Link
                    to='/newworkout'
                    className='navItem'
                >
                    <img src={NewWorkoutIcon} alt='New workout link logo' className='navIcon'></img>
                    <p className='navItem__text'>newWorkout</p>
                </Link>
                <Link
                    to='/'
                    className='navItem'
                    onClick={this.handleLogoutClick}
                >
                    <img src={LogoutIcon} alt='Logout link logo' className='navIcon'></img>
                    <p className='navItem__text2'>Logout</p>
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/register'
                    className='navItem'
                >
                    <img src={RegisterIcon} alt='Register link logo' className='navIcon'></img>
                    <p className='navItem__text'>Register</p>
                </Link>
                <Link
                    to='/login'
                    className='navItem'
                >
                    <img src={LoginIcon} alt='Login link logo' className='navIcon'></img>
                    <p className='navItem__text2'>Login</p>
                </Link>
            </div>
        )
    }

    render() {
        return (
            <nav className='Header'>
                <span className='Header__text'>
                    <img src={Logo} alt='benchmark logo' className='logoIcon' />
                    <Link to='/' className='logo'>
                        benchMark
                    </Link>
                </span>                           
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}                 
            </nav>        
        )
    }
}