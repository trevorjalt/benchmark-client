import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Button } from '../Utils/Utils'
import DeleteIcon from '../Exercise/images/delete-exercise-icon.png'
import EditIcon from '../Exercise/images/edit-exercise-icon.png'
import SubmitIcon from '../Exercise/images/submit-exercise-icon.png'
import './ExerciseSet.css'


export default class ExerciseSet extends Component {
    static contextType = WorkoutContext

    state = {
        error: null,
        inputValue: '',
        setSubmit: null,
        updateExerciseSetWeight: [],
        updateExerciseSetRepetition: [],
    }

    handleClickDeleteExerciseSet = event => {
        event.preventDefault()
        const { exerciseSetList = [], onDeleteExerciseSet, clearError } = this.context
        const { exerciseSet } = this.props
        const newList = exerciseSetList.filter((item) => item.id !== exerciseSet.id)

        clearError()
        WorkoutApiService.deleteExerciseSet(exerciseSet.id)
            .then(onDeleteExerciseSet(newList))
    }

    handleClickEditExerciseSet = () => {
        this.setState({ setSubmit: !this.state.setSubmit })
    }

    handleClickSubmitExerciseSet = event => {
        event.preventDefault()
        const { exerciseSetList = [], onUpdateExerciseSet } = this.context
        const newExerciseSet = {...this.state.updateExerciseSetRepetition, ...this.state.updateExerciseSetWeight}
        const displayList = exerciseSetList.map((item) =>
            item.id === newExerciseSet.id
            ? Object.assign({}, item, newExerciseSet) : item)
        
        if (this.state.inputValue === '') {
            this.handleClickEditExerciseSet()
            return
        } else {       
            this.setState({ error: null })
            WorkoutApiService.updateExerciseSet(newExerciseSet)
                .then(onUpdateExerciseSet(displayList))
                .then(this.setState({ setSubmit: !this.state.setSubmit }))
        }
                
    }

    onRepetitionInputChange = event => {
        this.setState({
            updateExerciseSetRepetition: {
                id: this.props.exerciseSet.id,
                set_repetition: Number(event.target.value),
            },
            inputValue: Number(event.target.value)
        })
        this.props.onRepetitionChange(this.props.exerciseSet.id, Number(event.target.value), this.props.exerciseSet.exercise_id)
    }

    onWeightInputChange = event => {
        this.setState({
            updateExerciseSetWeight: {
                id: this.props.exerciseSet.id,
                set_weight: Number(event.target.value),
            },
            inputValue: Number(event.target.value),
        })
        this.props.onWeightChange(this.props.exerciseSet.id, Number(event.target.value), this.props.exerciseSet.exercise_id)
    }

    renderExerciseSetState() {
        const { error } = this.state
        const { continueWorkout, exerciseSet, newWorkout } = this.props
        const vol = (exerciseSet.set_weight * exerciseSet.set_repetition)

        if (this.state.setSubmit) {
                return (
                    <div className='ExerciseSetItemUpdateForm'>
                        <div className='ExerciseSetItem'>
                            <div className='NewExerciseSet__weight'>Weight: 
                                <span className='ExerciseSetItem__data'>{exerciseSet.set_weight} lbs</span>
                            </div>
                            <div className='NewExerciseSet__repetition'>Reps: 
                                <span className='ExerciseSetItem__data'>{exerciseSet.set_repetition}</span>
                            </div>
                            <div className='NewExerciseSet__volume'>Vol: 
                                <span className='ExerciseSetItem__data'>{vol} lbs</span>
                            </div>
                        </div>
                        {this.renderEditExerciseSetButton()}
                        {this.renderDeleteExerciseSetButton()}
                    </div>
                )
        } else if (continueWorkout || newWorkout) {
            return (
                <div>
                    <div className='error-message' role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <form className='ExerciseSetItemUpdateForm'>
                    <div className='ExerciseSetItem'>
                        <div className='set_weight'>
                            <label htmlFor='SetItem__weight'>
                                Weight
                            </label>
                            <input
                                required
                                name='set_weight'
                                id='SetItem__weight'
                                type='number'
                                // aria-label='Weight'
                                // aria-required='true'
                                aria-describedby='weightError'
                                // // aria-invalid='true'
                                defaultValue={exerciseSet.set_weight}
                                onInput={this.onWeightInputChange.bind(this)}
                            />
                            <span className='ExerciseSetPounds'>lbs</span>
                            {/* <div
                                className='errorMessage'
                                id='weightError'
                                aria-live="assertive"
                                >
                                Please enter a valid number for your set weight
                            </div> */}
                        </div>
                        <div className='repetition'>
                            <label htmlFor='SetItem__repetition'>
                                Reps
                            </label>
                            <input
                                required
                                name='set_repetition'
                                type='number'
                                id='SetItem__repetition'
                                defaultValue={exerciseSet.set_repetition}
                                onInput={this.onRepetitionInputChange.bind(this)}
                                >
                            </input>
                        </div>
                        {this.renderSubmitExerciseSetButton()}
                        {this.renderDeleteExerciseSetButton()}
                    </div>
                    </form>
                </div>
            )
        } else {
            return (
                <div className='ExerciseSetItem'>
                    <div className='ExerciseSetItem__weight'>Weight: 
                        <span className='ExerciseSetItem__data'>{exerciseSet.set_weight} lbs</span>
                    </div>
                    <div className='ExerciseSetItem__repetition'>Reps: 
                        <span className='ExerciseSetItem__data'>{exerciseSet.set_repetition}</span>
                    </div>
                    <div className='ExerciseSetItem__volume'> Vol: 
                        <span className='ExerciseSetItem__data'>{vol} lbs</span>
                    </div>
                </div>
            )
        }
    }

    renderDeleteExerciseSetButton() {
        return (
            <Button 
                className='ExerciseSetItem__delete' 
                type='button'
                onClick={this.handleClickDeleteExerciseSet}
            >
                <img src={DeleteIcon} alt='Delete exercise set icon' className='ExerciseSetItem__delete-icon' />
            </Button>
        )
    }

    renderEditExerciseSetButton() {
        return (
            <Button 
                className='ExerciseSetItem__edit' 
                type='button'
                onClick={this.handleClickEditExerciseSet}
            >
                <img src={EditIcon} alt='Edit exercise set icon' className='ExerciseSetItem__edit-icon' />
            </Button>
        )
    }

    renderSubmitExerciseSetButton() {
        return (
            <Button
                className='ExerciseSetItem__submit'
                type='submit'
                onClick={this.handleClickSubmitExerciseSet}
            >                
                <img src={SubmitIcon} alt='Submit exercise set icon' className='ExerciseSetItem__submit-icon' />
            </Button>
        )
    }

    render() {

        return (
            <div className='ExerciseSet__item'>
                {this.renderExerciseSetState()}
            </div>
        )
    }
}