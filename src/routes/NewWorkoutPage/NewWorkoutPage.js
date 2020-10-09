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
        const { setNewWorkoutItem, clearError } = this.context
        console.log(this.props)
        clearError()
        WorkoutApiService.postWorkout()
            .then(data => this.setState({ workoutItem: data }))
            // .then(data => WorkoutApiService.getWorkout(data.id) && setNewWorkoutItem(data))
            // .then(this.setState({ newWorkout: !this.state.newWorkout }))        
    }

    renderNewWorkout() {
        const { newWorkoutItem } = this.context
        console.log('STATE', this.state)
        console.log(this.state.workoutItem.id)

        return (
            <div>
                 {/* <p>{newWorkoutItem.date_created}</p> */}
           
            <Workout 
                key={this.state.workoutItem.id}
                workout={this.state.workoutItem}
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

                