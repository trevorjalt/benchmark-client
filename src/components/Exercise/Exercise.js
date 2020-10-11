import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Button, Section } from '../Utils/Utils'
import ExerciseSet from '../ExerciseSet/ExerciseSet'


export default class Exercise extends Component {
    static contextType = WorkoutContext

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExerciseSets()
            .then(this.context.setExerciseSetList)
            .catch(this.context.setError)
    }

    handleClickDeleteExercise = event => {
        event.preventDefault()
        const { exerciseList = [], onDeleteExercise, clearError } = this.context
        const { exercise } = this.props
        const newList = exerciseList.filter((item) => item.id !== exercise.id)
        // const { exercise } = this.state.newExerciseList
        // const exerciseId = this.state.newExerciseList.find(element => element.id === id)
        clearError()
        WorkoutApiService.deleteExercise(exercise.id)
            .then(onDeleteExercise(newList))

    }


    handleClickDelete = event => {
        event.preventDefault()
        const { workoutList = [], onDeleteWorkout, clearError } = this.context
        const { workout } = this.props
        const newList = workoutList.filter((item) => item.id !== workout.id)

        clearError()
        WorkoutApiService.deleteWorkout(workout.id)
            .then(onDeleteWorkout(newList))
            // .catch(this.context.setError())
    }

    renderExerciseSets() {
        const { exerciseSetList = [] } = this.context

        const exerciseSets = exerciseSetList.filter(
            exerciseSet => exerciseSet.exercise_id === this.props.exercise.id)
        return exerciseSets.map(exerciseSet =>
            <ExerciseSet
                key={exerciseSet.id}
                exerciseSet={exerciseSet}
                edit={this.props.edit}
                onRepetitionChange={this.props.onRepetitionChange}
                onWeightChange={this.props.onWeightChange}
                handleClickUpdate={this.props.handleClickUpdate}
            />
        
        )
    }

    renderExerciseState() {
        const {edit, error, exercise, newWorkout } = this.props

        if (edit || newWorkout) {
            return (
                <div>
                    <h2>{exercise.exercise_name}</h2>
                    <Section list className='MyExerciseSets'>
                            {error
                            ? <p className='red'>Whoops! There was an error</p>
                            : this.renderExerciseSets()}
                    </Section>
                    <span>Exercise Vol: # lbs</span>
                    {this.renderDeleteExerciseButton()}
                </div>
            ) 
        } else {
            return (
                <div>
                    <h2>{exercise.exercise_name}</h2>
                    <Section list className='MyExerciseSets'>
                            {error
                            ? <p className='red'>Whoops! There was an error</p>
                            : this.renderExerciseSets()}
                    </Section>
                    <span>Exercise Vol: # lbs</span>              
                </div>
            )            
        }
    }

    renderDeleteExerciseButton() {
        return (
            <Button 
                className='ExerciseItem__delete' 
                type='button'
                onClick={this.handleClickDeleteExercise}
            >
                Delete
            </Button>
        )
    }

    render() {
        return (
            <div className='ExerciseSet__item'>
                {this.renderExerciseState()}
            </div>
        )
    }
}