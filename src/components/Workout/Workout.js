import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { NiceDate, Section, Button } from '../Utils/Utils'
import { parseISO } from 'date-fns'
import Exercise from '../Exercise/Exercise'
import './Workout.css'



export default class Workout extends Component {
    static contextType = WorkoutContext

    state = { 
        touched: null,
        edit: null,
        updateSet: [], 
        testUpdate: {
            id: 1,
            set_weight: 55,
            set_repetition: 60,
        } 
    }

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExercises()
            .then(this.context.setExerciseList)
            .catch(this.context.setError)
    }

    handleUpdateSet = (value) => {
        this.setState({ updateSet: value })
    }

    // handleUpdateSet(target, payload) {
    //     const newState = Object.assign(this.state, {});
    //     newState[target] = payload
    //     this.setState(newState)
    // }

    handleClickDelete = event => {
        event.preventDefault()
        const { workoutList = [], onDeleteWorkout, clearError } = this.context
        const { workout } = this.props
        const newList = workoutList.filter((item) => item.id !== workout.id)
        clearError()
        WorkoutApiService.deleteWorkout(workout.id)
            .then(onDeleteWorkout(newList))
            // .catch(this.context.setError())
    }

    handleClickEdit = () => {
        this.setState({ edit: !this.state.edit })
    }

    handleClickUpdate = event => {
        event.preventDefault()
        const { workoutList = [] } = this.context
        this.context.clearError()
        const updatedExerciseSet = {
            id: this.state.updateSet.id,
            set_weight: this.state.updateSet.set_weight,
            set_repetition: this.state.updateSet.set_repetition
        }
       
        WorkoutApiService.updateWorkoutSet(updatedExerciseSet)
            .then(this.handleClickEdit())
            .then(this.context.onUpdateWorkoutSets(workoutList))
            // .catch(this.context.setError())
    }

    // handleClickUpdate = (updatedExerciseSet) => {
    //     // event.preventDefault()
    //     this.context.clearError()
       
    //     WorkoutApiService.updateWorkoutSet(updatedExerciseSet)
    //         .then(this.context.setExerciseSetList())
    //         // .catch(this.context.setError())

    // }

    handleClickTouched = () => {
        this.setState({ touched: !this.state.touched })
    }
    
    renderWorkouts() {
        const { error } = this.context
        const { workout } = this.props
        if (this.state.touched) {
            return (
                <div>                       
                    <WorkoutDate workout={workout} />
                    <Section list className='MyExercises'>
                        {error
                        ? <p className='red'>Whoops! There was an error</p>
                        : this.renderExercises()}
                    </Section>
                    {this.state.edit
                        ? this.renderUpdateButton()
                        : this.renderEditButton()
                    }
                    <Button 
                        className='ExerciseItem__delete' 
                        type='button'
                        onClick={this.handleClickDelete}
                    >
                        Delete
                    </Button>   
                </div>    
            )
        } else {
        return (
            <div>                       
                <WorkoutDate workout={workout} />
            </div> 
        )}
    }


    renderExercises() {
        const { exerciseList = [] } = this.context

        const workoutExercises = exerciseList.filter(
            exercise => exercise.workout_id === this.props.workout.id)
        return workoutExercises.map(exercise => 
            <Exercise
                key={exercise.id}
                exercise={exercise}
                edit={this.state.edit}
                handleClickUpdate={this.handleClickUpdate}
                handleUpdateSet={this.handleUpdateSet}
            />
        )
    }

    renderEditButton() {
        return (
            <Button 
                className='ExerciseItem__edit' 
                type='button'
                onClick={this.handleClickEdit}
            >
                Edit
            </Button>
        )
    }

    renderUpdateButton() {
        return (
            <Button 
                className='ExerciseItem__update' 
                type='button'
                onClick={this.handleClickUpdate}
            >
                Update
            </Button>
        )
    }

    render() {
        return (
            <div className='Workout__item' onDoubleClick={this.handleClickTouched}>                    
                {this.renderWorkouts()}
            </div>    
        )
    }
}

function WorkoutDate({ workout }) {
    return (
        <h2 className='Workout__date'>
            <NiceDate
                date={parseISO(workout.date_created)}
            />
        </h2>
    )
}