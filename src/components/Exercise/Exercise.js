import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Section } from '../Utils/Utils'
import ExerciseSet from '../ExerciseSet/ExerciseSet'


export default class Exercise extends Component {
    static contextType = WorkoutContext

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExerciseSets()
            .then(this.context.setExerciseSetList)
            .catch(this.context.setError)
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

    render() {
        const { exercise } = this.props
        const { error } = this.context

        return (
            <div className='ExerciseSet__item'>
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