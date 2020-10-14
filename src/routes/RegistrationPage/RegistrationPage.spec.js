import React from 'react'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import RegistrationPage from './RegistrationPage'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`RegistrationPage Route`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <WorkoutProvider>
                    <RegistrationPage />
                </WorkoutProvider>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})