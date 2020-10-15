import React, { Component } from 'react'
import { Button, Input, Required } from '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'
import RegisterIcon from '../Header/images/register-icon.png'
import './RegistrationForm.css'

export default class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    }

    state = { error: null }

    handleSubmit = event => {
        event.preventDefault()
        const { username, user_password, email, user_password_match } = event.target
        
        if (user_password.value !== user_password_match.value) {
            this.setState( {error: 'Passwords must match' })
            return
        } else {
       
        this.setState({ error: null })
        AuthApiService.postUser({
            username: username.value,
            user_password: user_password.value,
            email: email.value,
        })
            .then(user => {
                username.value = ''
                user_password.value = ''
                email.value = ''
                user_password_match.value = ''
                this.props.onRegistrationSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
        }

    }
    render() {
        const { error } = this.state
        return (
            <div>
                <h3 className='Registration__prompt'>Set your benchMark today</h3>
                <div className='DemoContainer'>
                    <div className='DemoInformation'>
                        <h4 className='blue'>Want to see it in action before signing up?</h4>
                        <p>Head over to the login page and use the following to sign in:</p>
                        <p><span className='bold'>Username:</span> <span className='blue'>limitbreaker</span></p>
                        <p><span className='bold'>Password:</span> <span className='blue'>benchMark1!</span></p>
                    </div>
                </div>
                <form 
                    className='RegistrationForm'
                    onSubmit={this.handleSubmit}
                >
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='username' id='chooseUsername'>
                        <label htmlFor='RegistrationForm__username'>
                            Username <Required />
                        </label>
                        <Input
                            name='username'
                            type='text'
                            required
                            id='RegistrationForm__username'
                            aria-required='true'
                            aria-labelledby='chooseUsername'
                        >
                        </Input>
                    </div>
                    <div className='email' id='userEmail'>
                        <label htmlFor='RegistrationForm__email'>
                            Email <Required />
                        </label>
                        <Input
                            name='email'
                            type='email'
                            required
                            id='RegistrationForm__email'
                            aria-required='true'
                            aria-labelledby='userEmail'
                        >
                        </Input>
                    </div>
                    <div className='user_password' id='choosePassword'>
                        <label htmlFor='RegistrationForm__password'>
                            Password <Required />
                        </label>
                        <Input
                            name='user_password'
                            type='password'
                            required
                            id='RegistrationForm__password'
                            aria-required='true'
                            aria-labelledby='choosePassword'
                        >
                        </Input>
                    </div>
                    <div className='user_password_match' id='passwordMatch'>
                        <label htmlFor='RegistrationForm__password_match'>
                            Re-Enter Password <Required />
                        </label>
                        <Input
                            name='user_password_match'
                            type='password'
                            required
                            id='RegistrationForm__password_match'
                            aria-required='true'
                            aria-labelledby='passwordMatch'
                        >
                        </Input>
                    </div>
                    <div className='Register__button'>
                        <Button type='submit' className='RegisterSubmit'>
                        <img src={RegisterIcon} alt='Register button logo' className='Register__icon' />
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}