import React from 'react'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import Workout from './Workout'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`Workout Component`, () => {
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <WorkoutProvider>
                    <Workout />
                </WorkoutProvider>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})