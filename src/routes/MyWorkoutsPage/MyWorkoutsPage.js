import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Section } from '../../components/Utils/Utils'
import Workout from '../../components/Workout/Workout'


export default class MyWorkoutsPage extends Component {
    static contextType = WorkoutContext

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getWorkouts()
            .then(this.context.setWorkoutList)
            .catch(this.context.setError)
    }

    renderWorkouts() {
        const { workoutList = [] } = this.context
        return workoutList.map(workout =>
            <Workout 
                key={workout.id}
                workout={workout}
            />       
        )
    }

    render() {
        const { error } = this.context
        return (
            <div>
                <h1>myWorkouts</h1>
                <Section list className='MyWorkoutsPage'>
                    {error
                    ? <p className='red'>Whoops! There was an error</p>
                    : this.renderWorkouts()}
                </Section>
            </div>
        )
    }
}