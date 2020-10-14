import React from 'react'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import NewWorkoutPage from './NewWorkoutPage'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`NewWorkoutPage Route`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <WorkoutProvider>
                    <NewWorkoutPage />
                </WorkoutProvider>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})