import React from 'react'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import LandingPage from './LandingPage'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`LandingPage Route`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <WorkoutProvider>
                    <LandingPage />
                </WorkoutProvider>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})