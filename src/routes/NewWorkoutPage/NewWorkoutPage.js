import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Section, Button } from '../../components/Utils/Utils'
import Workout from '../../components/Workout/Workout'

export default class NewWorkoutPage extends Component {
    static contextType = WorkoutContext

// newWorkout in context?
// newExercise in context?
// newSet in context?

    renderNewButton() {
        return (
            <Button 
                className='ExerciseItem__cancel' 
                type='button'
                onClick={this.handleClickEdit}
            >
                Cancel
            </Button>
        )
    }

    render() {
        const { error } = this.context
        return (
            <div>
                <h1>today</h1>
            </div>
        )
    }
}