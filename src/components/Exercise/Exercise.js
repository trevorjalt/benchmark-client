import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Button, Section } from '../Utils/Utils'
import ExerciseSet from '../ExerciseSet/ExerciseSet'
import './Exercise.css'


export default class Exercise extends Component {
    static contextType = WorkoutContext

    state = {
        editExerciseName: null,
        updateExerciseName: [],
    }

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExerciseSets()
            .then(this.context.setExerciseSetList)
            .catch(this.context.setError)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.updateExerciseName !== this.state.updateExerciseName) {
            this.context.clearError()
            // WorkoutApiService.getExerciseItem(this.state.newExerciseList.id)
                // .then(this.setState({ newWorkout: !this.state.newWorkout }))
            WorkoutApiService.getExercises()
                .then(this.context.setExerciseList)
                .catch(this.context.setError)

        }
    }

    handleClickDeleteExercise = event => {
        event.preventDefault()
        const { exerciseList = [], onDeleteExercise, clearError } = this.context
        const { exercise } = this.props
        const newList = exerciseList.filter((item) => item.id !== exercise.id)

        clearError()
        WorkoutApiService.deleteExercise(exercise.id)
            .then(onDeleteExercise(newList))

    }

    handleClickEditExerciseName = () => {
        this.setState({ editExerciseName: !this.state.editExerciseName })
    }

    handleSubmitExerciseName = event => {
        event.preventDefault()
        const { exerciseList = [], clearError, onUpdateExercise } = this.context
        console.log('state', this.state.updateExerciseName.id)

        clearError()
        // const displayList = exerciseList.filter((item, i) => {
        //     return (item.id === this.state.updateExerciseName.id) && Object.assign({},item,this.state.updateExerciseName[i])})
        console.log('state', this.state.updateExerciseName)
        console.log('existingList', exerciseList)
        // console.log('list', displayList2)

        WorkoutApiService.updateExercise(this.state.updateExerciseName)
            // .then(onUpdateExercise(test3))
                .then(data => this.setState({ updateExerciseName: data }))
            // .then(this.context.setExerciseList)
            .then(this.setState({ editExerciseName: !this.state.editExerciseName }))
    }

    onSelectExerciseNameChange = (event) => {
        const { exercise } = this.props
        this.setState({
            updateExerciseName: {
                id: exercise.id,
                exercise_name: event.target.value,
            }
        })
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
        const { error } = this.context
        const { continueWorkout, exercise, newWorkout } = this.props

        if (this.state.editExerciseName) {
            return (
                <div>
                <form className='EditExerciseNameForm' onChange={e => this.onSelectExerciseNameChange(e)}>
                        <label htmlFor='ExerciseName__select'></label>
                        <select name='ExerciseName__select' id='ExerciseName__select'
                        // onChange={(event) => this.context.filterSelect(event.target.value)}
                        >
                            <option value=''>Select</option>
                            <option value='Squat'>Squat</option>
                            <option value='Bench'>Bench</option>
                            <option value='Row'>Row</option>
                            <option value='Deadlift'>DeadLift</option>
                            <option value='Military Press'>Military Press</option>
                            <option value='Clean'>Clean</option>
                        </select>

                </form>
                {this.renderSubmitExerciseNameButton()}
                <Section list className='MyExerciseSets'>
                        {error
                        ? <p className='red'>Whoops! There was an error</p>
                        : this.renderExerciseSets()}
                </Section>
                <span>Exercise Vol: # lbs</span>              
            </div>
                
            ) 
        } else if (continueWorkout || newWorkout) {
            return (
                <div>
                    <div className='ExerciseItem___header'>
                        <h2>{exercise.exercise_name}</h2>
                        {this.renderEditExerciseNameButton()}
                        {this.renderDeleteExerciseButton()}
                    </div>
                    <Section list className='MyExerciseSets'>
                            {error
                            ? <p className='red'>Whoops! There was an error</p>
                            : this.renderExerciseSets()}
                    </Section>
                    <span>Exercise Vol: # lbs</span>
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
                🗑
            </Button>
        )
    }

    renderEditExerciseNameButton() {
        return (
            <Button 
                className='ExerciseItem__edit' 
                type='button'
                onClick={this.handleClickEditExerciseName}
            >
                ✎
            </Button>
        )
    }

    renderSubmitExerciseNameButton() {
        return (
            <Button 
                className='ExerciseItem__submit' 
                type='button'
                onClick={this.handleSubmitExerciseName}
            >
                ✔
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