import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Button } from '../Utils/Utils'
import './ExerciseSet.css'


export default class ExerciseSet extends Component {
    static contextType = WorkoutContext

    state = {
        error: null,
        inputValue: null,
        setSubmit: null,
        updateExerciseSetWeight: [],
        updateExerciseSetRepetition: [],
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.setSubmit !== this.state.setSubmit) {
    //         this.context.clearError()
    //         // WorkoutApiService.getExerciseItem(this.state.newExerciseList.id)
    //             // .then(this.setState({ newWorkout: !this.state.newWorkout }))
    //         WorkoutApiService.getExerciseSets()
    //             .then(this.context.setExerciseSetList)
    //             .catch(this.context.setError)

    //     }
    // }

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
        
        if (!this.state.inputValue) {
            this.setState({ error: 'Please enter a valid number for weight and repetitions'})
            return
        } else {       
            this.setState({ error: null })
            WorkoutApiService.updateExerciseSet(newExerciseSet)
                .then(onUpdateExerciseSet(displayList))
                .then(this.setState({ setSubmit: !this.state.setSubmit }))
        }
                
    }

    // onLocalRepetitionInputChange = event => {
    //     this.setState({
    //         updateExerciseSetRepetition: {
    //             id: this.props.exerciseSet.id,
    //             set_repetition: Number(event.target.value),
    //         }
    //     })
    // }

    // onLocalWeightInputChange = event => {
    //     this.setState({
    //         updateExerciseSetWeight: {
    //             id: this.props.exerciseSet.id,
    //             set_weight: Number(event.target.value),
    //         }
    //     })
    // }

    onRepetitionInputChange = event => {
        this.setState({
            updateExerciseSetRepetition: {
                id: this.props.exerciseSet.id,
                set_repetition: Number(event.target.value),
            },
            inputValue: !this.state.inputValue,
        })
        this.props.onRepetitionChange(this.props.exerciseSet.id, Number(event.target.value), this.props.exerciseSet.exercise_id)
        // this.props.handleUpdateSet(this.state.set_repetition)
    }

    onWeightInputChange = event => {
        this.setState({
            updateExerciseSetWeight: {
                id: this.props.exerciseSet.id,
                set_weight: Number(event.target.value),
            },
            inputValue: !this.state.inputValue,
        })
        this.props.onWeightChange(this.props.exerciseSet.id, Number(event.target.value), this.props.exerciseSet.exercise_id)
        // this.setState({ set_repetition: event.target.value})
    }


    renderExerciseSetState() {
        const { error } = this.state
        const { continueWorkout, exerciseSet, newWorkout } = this.props
        const vol = (exerciseSet.set_weight * exerciseSet.set_repetition)

        if (this.state.setSubmit) {
                return (
                    <div className='SetItemUpdateForm'>
                        <div className='ExerciseSet__item'>
                            <span>Set #</span>
                            <span>{exerciseSet.set_weight} lbs </span>
                            <span>{exerciseSet.set_repetition} reps </span>
                            <span>Vol: {vol} lbs</span>
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
                    <form className='SetItemUpdateForm'>
                        <div className='weight'>
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
                            <span> lbs </span>
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
                    </form>
                </div>
            )
        } else {
            return (
                <div className='ExerciseSet__item'>
                    <span>Set #</span>
                    <span>{exerciseSet.set_weight} lbs </span>
                    <span>{exerciseSet.set_repetition} reps </span>
                    <span>Vol: {vol} lbs</span>
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
                🗑
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
                ✎
            </Button>
        )
    }

    renderSubmitExerciseSetButton() {
        return (
            <Button
                className='test_button'
                type='submit'
                onClick={this.handleClickSubmitExerciseSet}
            >                
                ✔ 
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