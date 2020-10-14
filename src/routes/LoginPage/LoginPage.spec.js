import React from 'react'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import LoginPage from './LoginPage'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`LoginPage Route`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <WorkoutProvider>
                    <LoginPage />
                </WorkoutProvider>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})