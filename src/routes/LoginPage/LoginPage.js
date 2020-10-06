import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import WorkoutContext from '../../contexts/WorkoutContext'
import { Section } from '../../components/Utils/Utils'

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    static contextType = WorkoutContext

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/myworkouts'
        history.push(destination)
        this.context.setIsLoggedIn(true)
        
    }

    render() {
        return (
            <Section className='LoginPage'>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </Section>
        )
    }
}