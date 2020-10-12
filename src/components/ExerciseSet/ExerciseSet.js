import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Button } from '../Utils/Utils'
import './ExerciseSet.css'


export default class ExerciseSet extends Component {
    static contextType = WorkoutContext

    state = {
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

    handleClickSubmitExerciseSet = event => {
        event.preventDefault()
        const { exerciseSetList = [], clearError, onUpdateExerciseSet } = this.context
        const newExerciseSet = {...this.state.updateExerciseSetRepetition, ...this.state.updateExerciseSetWeight}
        console.log(newExerciseSet)
        clearError()
        WorkoutApiService.updateExerciseSet(newExerciseSet)


    }
    onLocalRepetitionInputChange = event => {
        this.setState({
            updateExerciseSetRepetition: {
                id: this.props.exerciseSet.id,
                set_repetition: Number(event.target.value),
            }
        })

    }

    onLocalWeightInputChange = event => {
        this.setState({
            updateExerciseSetWeight: {
                id: this.props.exerciseSet.id,
                set_weight: Number(event.target.value),
            }
        })
    }

    onRepetitionInputChange = event => {
        this.props.onRepetitionChange(this.props.exerciseSet.id, Number(event.target.value), this.props.exerciseSet.exercise_id)
        // this.props.handleUpdateSet(this.state.set_repetition)
    }

    onWeightInputChange = event => {
        console.log(this.props.exerciseSet.id)
        this.props.onWeightChange(this.props.exerciseSet.id, Number(event.target.value), this.props.exerciseSet.exercise_id)
        // this.setState({ set_repetition: event.target.value})
    }

    // handleFormChange(event) {
    //     const { exerciseSet } = this.props
        
    //     this.setState({
    //         updateExerciseSet: {
    //             id: exerciseSet.id,
    //             set_weight: this.onLocalWeightInputChange(),
    //             set_repetition: this.onLocalRepetitionInputChange(),
    //         } 
    //     })
    //     // const updateSet = {
    //     //     id: exerciseSet.id,
    //     //     set_weight: this.state.set_weight,
    //     //     set_repetition: this.state.set_repetition,
    //     // }
    //     // this.setState
    // }

    // handleUpdateChange = () => {
    //     const updateSet = { set_weight: this.state.set_weight, set_repetition: this.state.set_repetition }
    //     this.props.handleUpdateSet(updateSet)
    //     // const updateSet =  {this.handleWeightChange
    // }

    // handleClickUpdate = event => {
    //     event.preventDefault()
    //     const { exerciseSet, edit } = this.props
    //     const updatedExerciseSet = {
    //         id: exerciseSet.id,
    //         // set_weight: Number(event.target.SetItem__weight.value),
    //         // set_repetition: Number(event.target.repetition.value),
    //         set_weight: this.state.set_weight,
    //         set_repetition: this.state.set_repetition,
    //     }
    //     console.log(updatedExerciseSet)
    //     console.log(this.props)
    //     this.props.handleClickUpdate(updatedExerciseSet)
        
    // }
    renderExerciseSetState() {
        const { continueWorkout, edit, exerciseSet, newWorkout } = this.props
        const vol = (exerciseSet.set_weight * exerciseSet.set_repetition)

        if (continueWorkout || newWorkout) {
            return (
                <div className='SetItemUpdateForm'>
                <form
                className='SetItemUpdateForm'
                // onInput={event => this.handleFormChange(event)}
                >
                {/* <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div> */}
                <div className='weight'>
                    <label htmlFor='SetItem__weight'>
                        Weight
                    </label>
                    <input
                        required
                        name='set_weight'
                        id='SetItem__weight'
                        defaultValue={exerciseSet.set_weight}
                        onInput={this.onLocalWeightInputChange.bind(this)}
                        >
                        
                    </input>
                    <span> lbs </span>
                </div>
                <div className='repetition'>
                    <label htmlFor='SetItem__repetition'>
                        Reps
                    </label>
                    <input
                        required
                        name='set_repetition'
                        type='integer'
                        id='SetItem__repetition'
                        defaultValue={exerciseSet.set_repetition}
                        onInput={this.onLocalRepetitionInputChange.bind(this)}
                        >
                    </input>
                </div>
                <Button
                    className='test_button'
                    type='submit'
                    onClick={this.handleClickSubmitExerciseSet}>
                    
                    ✔ 
                </Button>
                {this.renderDeleteExerciseSetButton()}
            </form>
            </div>
            )
        } else if (edit) {
            return (
                <div className='SetItemUpdateForm'>
                    <form
                        className='SetItemUpdateForm'
                    // onInput={event => this.handleFormChange(event)}
                    >
                    {/* <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div> */}
                    <div className='weight'>
                        <label htmlFor='SetItem__weight'>
                            Weight
                        </label>
                        <input
                            required
                            name='set_weight'
                            id='SetItem__weight'
                            defaultValue={exerciseSet.set_weight}
                            onChange={this.onWeightInputChange.bind(this)}
                            >
                            
                        </input>
                        <span> lbs </span>
                    </div>
                    <div className='repetition'>
                        <label htmlFor='SetItem__repetition'>
                            Reps
                        </label>
                        <input
                            required
                            name='set_repetition'
                            type='integer'
                            id='SetItem__repetition'
                            defaultValue={exerciseSet.set_repetition}
                            onChange={this.onRepetitionInputChange.bind(this)}
                            >
                        </input>
                    </div>
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
    
    render() {

        return (
            <div className='ExerciseSet__item'>
                {this.renderExerciseSetState()}
            </div>
        )
    }
}