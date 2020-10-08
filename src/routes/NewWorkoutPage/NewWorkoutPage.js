import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Section } from '../../components/Utils/Utils'
import Workout from '../../components/Workout/Workout'

export default class NewWorkoutPage extends Component {
    static contextType = WorkoutContext

    render() {
        const { error } = this.context
        return (
            <div>
                <h1>today</h1>
            </div>
        )
    }
}