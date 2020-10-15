import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import WorkoutContext from '../../contexts/WorkoutContext'
import { Button, Input } from '../Utils/Utils'
import LoginIcon from '../Header/images/login-icon.png'
import './LoginForm.css'

export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    static contextType = WorkoutContext

    state = { 
        error: null,
    }

    handleSubmitBasicAuth = event => {
        event.preventDefault()
        const { username, user_password } = event.target

        username.value = ''
        user_password.value = ''
        this.props.onLoginSuccess()
    }

    handleSubmitJwtAuth = event => {
        event.preventDefault()
        this.setState({ error: null })

        const { username, user_password } = event.target

        AuthApiService.postLogin({
            username: username.value,
            user_password: user_password.value,
        })
            .then(res => {
                username.value = ''
                user_password.value = ''
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='username' id='username'>
                    <label htmlFor='LoginForm__username'>
                        Username
                    </label>
                    <Input
                        required
                        name='username'
                        id='LoginForm__username'
                        aria-required='true'
                        aria-labelledby='username'
                    >
                    </Input>
                </div>
                <div className='user_password' id='password'>
                    <label htmlFor='LoginForm__password'>
                        Password
                    </label>
                    <Input
                        required
                        name='user_password'
                        type='password'
                        id='LoginForm__password'
                        aria-required='true'
                        aria-labelledby='password'
                    >
                    </Input>
                </div>
                <div className='Login__button'>
                    <Button 
                        className='LoginSubmit'
                        type='submit'
                    >
                        <img src={LoginIcon} alt='Login Button logo' className='Login__icon' />
                        Login
                    </Button>
                </div>
            </form>
        )
    }
}