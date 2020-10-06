import React, { Component } from 'react'
import Landing from '../../components/Landing/Landing' 
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import { Section } from '../../components/Utils/Utils'

export default class LandingPage extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        },
    }

    handleRegistrationSuccess = user => {
        const { history } = this.props
        history.push('/login')
    }
    render() {
        return (
            <Section className='LandingPage'>
                <Landing />
                <RegistrationForm 
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </Section>
        )
    }
}