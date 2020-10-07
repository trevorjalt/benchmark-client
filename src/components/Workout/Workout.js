import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { NiceDate, Section, Button } from '../Utils/Utils'
import { parseISO } from 'date-fns'
import Exercise from '../Exercise/Exercise'
import './Workout.css'



export default class Workout extends Component {
    static contextType = WorkoutContext

    state = { touched: null }

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExercises()
            .then(this.context.setExerciseList)
            .catch(this.context.setError)
    }

    handleClickDelete = event => {
        event.preventDefault()
        const { workoutList = [] } = this.context
        const { workout } = this.props
        const newList = workoutList.filter((item) => item.id !== workout.id)
        this.context.clearError()
        WorkoutApiService.deleteWorkout(workout.id)
            .then(this.context.onDeleteWorkout(newList))
            .catch(this.context.setError)
    }

    handleWorkoutTouched = (e) => {
        this.setTouched(true)
    }

    setTouched = () => {
        this.setState({ touched: !this.state.touched })
    }
    
    renderWorkouts() {
        const { error } = this.context
        const { workout } = this.props
        if (this.state.touched) {
            return (
                <div>                       
                    <WorkoutDate workout={workout} />
                    <Section list className='MyExercises'>
                        {error
                        ? <p className='red'>Whoops! There was an error</p>
                        : this.renderExercises()}
                    </Section>
                    <Button 
                        className='ExerciseItem__delete' 
                        type='button'
                        onClick={this.handleClickDelete}
                    >
                        Delete
                    </Button>
                </div>    
            )
        } else {
        return (
            <div>                       
                <WorkoutDate workout={workout} />
            </div> 
        )}
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