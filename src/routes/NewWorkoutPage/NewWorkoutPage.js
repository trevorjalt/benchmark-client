import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Section, Button } from '../../components/Utils/Utils'
import Workout from '../../components/Workout/Workout'

export default class NewWorkoutPage extends Component {
    static contextType = WorkoutContext

    state = {
        newWorkout: null,
        test: {}
    }

    // componentDidMount() {
    //     this.context.clearError()
    //     WorkoutApiService.getWorkout(this.context.newWorkoutItem.id)
    //         .catch(this.context.setError)
    // }

    // componentDidMount() {
    //     this.context.clearError()
    //     WorkoutApiService.getWorkouts()
    //         .then(this.context.setWorkoutList)
    //         .catch(this.context.setError)
    // }

    handleClickNew = event => {
        event.preventDefault()
        const { setNewWorkoutItem, clearError } = this.context
        
        // console.log(this.props, workoutList)
        clearError()
        WorkoutApiService.postWorkout()
            .then(data => WorkoutApiService.getWorkout(data.id) && setNewWorkoutItem(data))
            .then(this.setState({ newWorkout: !this.state.newWorkout }))
            // .then(data => setNewWorkoutItem(data))          
    }

    renderNewWorkout() {
        const { newWorkoutItem } = this.context
        console.log('list check', newWorkoutItem)

        return (
            <div>
                <p>{newWorkoutItem.date_created}</p>
           
            <Workout 
                key={newWorkoutItem.id}
                workout={newWorkoutItem.test}
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

                