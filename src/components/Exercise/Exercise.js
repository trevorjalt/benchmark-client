import React, { Component } from 'react'

export default class Exercise extends Component {
    render() {
        const { exercise } = this.props

        return (
            <div className='Exercise__item'>
                <span>{exercise.exercise_name}</span>
                
            </div>
        )
    }
}