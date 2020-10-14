import React from 'react'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import MyWorkoutsPage from './MyWorkoutsPage'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`MyWorkoutsPagePage Route`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <WorkoutProvider>
                    <MyWorkoutsPage />
                </WorkoutProvider>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})