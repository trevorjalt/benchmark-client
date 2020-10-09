import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Section, Button } from '../../components/Utils/Utils'
import Workout from '../../components/Workout/Workout'

export default class NewWorkoutPage extends Component {
    static contextType = WorkoutContext

    state = {
        newWorkout: null,
        workoutItem: {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.workoutItem !== this.state.workoutItem) {
            this.context.clearError()
            WorkoutApiService.getWorkout(this.state.workoutItem.id)
                .then(this.setState({ newWorkout: !this.state.newWorkout }))
                .catch(this.context.setError)
        }
    }

    handleClickNew = event => {
        event.preventDefault()
        const { clearError } = this.context
        console.log(this.props)
        clearError()
        WorkoutApiService.postWorkout()
            .then(data => this.setState({ workoutItem: data }))       
    }

    renderNewWorkout() {

        return (
            <div> 
                <Workout 
                    key={this.state.workoutItem.id}
                    workout={this.state.workoutItem}
                    newWorkout={this.state.newWorkout}
                />
            </div>
        )
    }

    renderNewWorkoutButton() {        
        return (
            <Button 
                className='WorkoutItem__new' 
                type='button'
                onClick={this.handleClickNew}
            >
                New
            </Button>
        )
    }

    render() {
        const { error } = this.context
        
        if (this.state.newWorkout) {
            return (
                <div>
                    <h1>today</h1>
                    <Section list className='MyWorkoutsPage'>
                        {error
                        ? <p className='red'>Whoops! There was an error</p>
                        : this.renderNewWorkout()}
                    </Section>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>today</h1>
                    <Section list className='MyWorkoutsPage'>
                        {error
                        ? <p className='red'>Whoops! There was an error</p>
                        : this.renderNewWorkoutButton()}
                    </Section>
                </div>
            )
        }         
    }
}

                