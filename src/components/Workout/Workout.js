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

    renderExercises() {
        const { exerciseList = [] } = this.context
        console.log(exerciseList)

        const workoutExercises = exerciseList.filter(exercise => exercise.workout_id === this.props.workout.id)
        return workoutExercises.map(exercise => 
            <Exercise
                key={exercise.id}
                exercise={exercise}
            />
        )
    }

    render() {
        const { workout } = this.props
        const { error } = this.context
        console.log(this.props)

        return (
            <div className='Workout__item'>                  
                <WorkoutDate workout={workout} />
                <Section list className='MyExercises'>
                    {error
                    ? <p className='red'>Whoops! There was an error</p>
                    : this.renderExercises()}
                </Section>
            </div>
        )
    }
}

function WorkoutDate({ workout }) {
    return (
        <span className='Workout__date'>
            <NiceDate
                date={parseISO(workout.date_created)}
            />
        </span>
    )
}