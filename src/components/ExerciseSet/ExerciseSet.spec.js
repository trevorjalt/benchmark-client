import React from 'react'
import { WorkoutProvider } from '../../contexts/WorkoutContext'
import ExerciseSet from './ExerciseSet'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

describe(`ExerciseSet Component`, () => {
    const props = {
        exerciseSet: {
            id: 1,
            set_weight: 100,
            set_repetition: 5,
            exercise_id: 1,
        }
    }
    it (`renders without crashing`, () => {
        const wrapper = 
            shallow (
                <WorkoutProvider>
                    <ExerciseSet {...props}/>
                </WorkoutProvider>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})