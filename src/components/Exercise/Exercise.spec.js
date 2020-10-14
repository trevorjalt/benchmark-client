import React from 'react'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import Exercise from './Exercise'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`Exercise Component`, () => {
    const props = {
        exercise: {
            id: 1,
            exercise_name: 'Limit Breaker',
            workout_id: 1,
        }
    }
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <WorkoutProvider>
                    <Exercise {...props}/>
                </WorkoutProvider>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})