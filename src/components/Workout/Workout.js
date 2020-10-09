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
        updateSet: {}
    }

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExercises()
            .then(this.context.setExerciseList)
            .catch(this.context.setError)
    }

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

    // mergeArrayObjects(arr1,arr2){
    //     return arr1.map((item,i) => {
    //         if(item.id === arr2[i].id){
    //            //merging two objects
    //         return Object.assign({},item,arr2[i])
    //        }
    //     })
    // }

    handleClickUpdate = event => {
        event.preventDefault()
        const { exerciseSetList = [], clearError, onUpdateWorkoutSets } = this.context
        
        clearError()
        const setsToUpdate = Object.keys(this.state.updateSet).map(key => ({ id: Number(key), ...this.state.updateSet[key] }))
        const updateList = exerciseSetList.map(el => setsToUpdate.find(e => e.id === el.id) || el) 
        // const displayList = this.mergeArrayObjects(exerciseSetList, updateList)
        const displayList = exerciseSetList.map((item, i) => {
            return (item.id === updateList[i].id) && Object.assign({},item,updateList[i])})
            
        setsToUpdate.map(element => WorkoutApiService.updateWorkoutSet(element)
            .then(this.handleClickEdit())
            .then(onUpdateWorkoutSets(displayList))
        )
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

    onRepetitionChange = (id, set_repetition, exercise_id) => {
        this.setState({
            updateSet: {
                ...this.state.updateSet,
                [id]: {
                ...this.state.updateSet[id],
                set_repetition: set_repetition,
                exercise_id: exercise_id
                }
            }
        })
    }

    onWeightChange = (id, set_weight, exercise_id) => {
        this.setState({
            updateSet: {
                ...this.state.updateSet,
                [id]: {
                ...this.state.updateSet[id],
                set_weight: set_weight,
                exercise_id: exercise_id
            }
            }
        })
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
                onRepetitionChange={this.onRepetitionChange}
                onWeightChange={this.onWeightChange}
                handleClickUpdate={this.handleClickUpdate}
        
            />
        )
    }
    
    renderWorkouts() {
        const { error } = this.context
        const { workout } = this.props
        console.log(this.props)
        
        if(this.props.newWorkout) {
            return (
                <div>                       
                    <WorkoutDate workout={workout} />
                    {this.renderAddExerciseButton()} 
                </div>
            )
        } else if (this.state.touched) {
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
                    {this.state.edit
                        ? this.renderCancelButton()
                        : ''
                    }
                    {this.renderDeleteButton()}  
                </div>    
            )
            } else {
                return (
                    <div>                       
                        <WorkoutDate workout={workout} />
                    </div> 
            )}
    }

    renderAddExerciseButton() {
        return (
            <Button 
                className='ExerciseItem__add' 
                type='button'
                // onClick={this.handleClickEdit}
            >
                Add Exercise
            </Button>
        )
    }

    renderDeleteButton() {
        return (
            <Button 
                className='ExerciseItem__delete' 
                type='button'
                onClick={this.handleClickDelete}
            >
                Delete
            </Button>
        )
    }
    renderCancelButton() {
        return (
            <Button 
                className='ExerciseItem__cancel' 
                type='button'
                onClick={this.handleClickEdit}
            >
                Cancel
            </Button>
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