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
            // nickname: nickname.value,
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
                <h3>Set your benchMark today</h3>
                <form 
                    className='RegistrationForm'
                    onSubmit={this.handleSubmit}
                >
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='username'>
                        <label htmlFor="RegistrationForm__username">
                            Username <Required />
                        </label>
                        <Input
                            name='username'
                            type='text'
                            required
                            id='RegistrationForm_username'>
                        </Input>
                    </div>
                    <div className='email'>
                        <label htmlFor="RegistrationForm__email">
                            Email <Required />
                        </label>
                        <Input
                            name='email'
                            type='email'
                            required
                            id='RegistrationForm_email'>
                        </Input>
                    </div>
                    <div className='user_password'>
                        <label htmlFor="RegistrationForm__password">
                            Password <Required />
                        </label>
                        <Input
                            name='user_password'
                            type='password'
                            required
                            id='RegistrationForm__password'>
                        </Input>
                    </div>
                    <div className='user_password_match'>
                        <label htmlFor="RegistrationForm__password_match">
                            Re-Enter Password <Required />
                        </label>
                        <Input
                            name='user_password_match'
                            type='password'
                            required
                            id='RegistrationForm__password_match'>
                        </Input>
                    </div>
                    <div className='Register__button'>
                        <Button type='submit' className='RegisterSubmit'>
                        <img src={RegisterIcon} alt='Register' className='Register__icon' />
                            Register
                        </Button>
                    </div>
                </form>
            </div>

        )
    }
}