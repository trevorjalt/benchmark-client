import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { NiceDate, Section } from '../Utils/Utils'
import { parseISO } from 'date-fns'
import Exercise from '../Exercise/Exercise'
import './Workout.css'



export default class Workout extends Component {
    static contextType = WorkoutContext

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExercises()
            .then(this.context.setExerciseList)
            .catch(this.context.setError)
    }

    renderWorkouts() {
        const { error } = this.context
        const { workout } = this.props
        if (this.context.touched) {
            return (
                <div>                       
                    <WorkoutDate workout={workout} />
                    <Section list className='MyExercises'>
                        {error
                        ? <p className='red'>Whoops! There was an error</p>
                        : this.renderExercises()}
                    </Section>
                </div>    
            )
        } else {
        return (
            <div>                       
                <WorkoutDate workout={workout} />
            </div> 
        )
    }

    }

    renderExercises() {
        const { exerciseList = [] } = this.context

        const workoutExercises = exerciseList.filter(
            exercise => exercise.workout_id === this.props.workout.id)
        return workoutExercises.map(exercise => 
            <Exercise
                key={exercise.id}
                exercise={exercise}
            />
        )
    }

    handleWorkoutTouched = (e) => {
        this.context.setTouched(true)
        // this.findById(e)

    }

    // findById = (value) => {
    //     return this.props.workout.id === value
    // }

    render() {
        const { workout } = this.props
        const { error } = this.context

        return (
            <div className='Workout__item' onClick={this.handleWorkoutTouched}>                    
                {this.renderWorkouts()}
            </div>    
        )
    }
}

function WorkoutDate({ workout }) {
    return (
        <h2 className='Workout__date'>
            <NiceDate
                date={parseISO(workout.date_created)}
            />
        </h2>
    )
}