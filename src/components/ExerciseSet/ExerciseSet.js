import React, { Component } from 'react'
import './ExerciseSet.css'


export default class ExerciseSet extends Component {
    render() {
        const { exerciseSet } = this.props
        
        return (
            <div className='ExerciseSet__item'>
                <span>Set #</span>
                <span>{exerciseSet.set_weight} lbs</span>
                <span>{exerciseSet.set_repetition} reps</span>
                <span>Vol: #</span>
            </div>
        )
    }
}