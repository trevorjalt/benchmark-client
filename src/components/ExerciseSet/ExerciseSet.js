import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import { Button } from '../Utils/Utils'
import './ExerciseSet.css'


export default class ExerciseSet extends Component {
    static contextType = WorkoutContext

    handleClickUpdate = event => {
        event.preventDefault()
        const { exerciseSet } = this.props
        const updatedExerciseSet = {
            id: exerciseSet.id,
            set_weight: Number(event.target.SetItem__weight.value),
            set_repetition: Number(event.target.repetition.value),
            // exercise_id: exerciseSet.exercise_id,
            // user_id: exerciseSet.user_id,
        }
        console.log(updatedExerciseSet)
        console.log(this.props)
        this.props.handleClickUpdate(updatedExerciseSet)
        
    }
    renderExerciseSetState() {
        const { edit, exerciseSet } = this.props
        const vol = (exerciseSet.set_weight * exerciseSet.set_repetition)

        if (edit) {
            return (
               <div>
                <form
                className='SetItemUpdateForm'
                onSubmit={event => this.handleClickUpdate(event)}
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
                        name='weight'
                        id='SetItem__weight'
                        defaultValue={exerciseSet.set_weight}>
                        
                    </input>
                    <span> lbs </span>
                </div>
                <div className='repetition'>
                    <label htmlFor='SetItem__repetition'>
                        Reps
                    </label>
                    <input
                        required
                        name='repetition'
                        type='integer'
                        id='SetItem__repetition'
                        defaultValue={exerciseSet.set_repetition}>
                    </input>
                </div>
                <Button
                    className='test_button'
                    type='submit'
                    // onClick={this.handleClickUpdate}>
                    >
                    ✔ 
                </Button>
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
    
    render() {

        return (
            <div className='ExerciseSet__item'>
                {this.renderExerciseSetState()}
            </div>
        )
    }
}