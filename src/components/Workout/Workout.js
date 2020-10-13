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
        // edit: null,
        continueWorkout: null,
        touched: null,
        updateSet: {},
        addExercise: {},
        newExerciseList: [],
    }

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExercises()
            .then(this.context.setExerciseList)
            .catch(this.context.setError)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.newExerciseList !== this.state.newExerciseList) {
            this.context.clearError()
            // WorkoutApiService.getExerciseItem(this.state.newExerciseList.id)
                // .then(this.setState({ newWorkout: !this.state.newWorkout }))
            WorkoutApiService.getExercises()
                .then(this.context.setExerciseList)
                .catch(this.context.setError)

        }
    }

    handleClickAddExercise = event => {
        event.preventDefault()
        const { clearError } = this.context

        clearError()
        WorkoutApiService.postExercise(this.state.addExercise)
            .then(exercise => this.setState(
                {newExerciseList: [...this.state.newExerciseList, exercise]}))
    }

    handleClickComplete = () => {
        this.setState({ continueWorkout: !this.state.continuWorkout })
    }

    handleClickContinue = () => {
        this.setState({ continueWorkout: !this.state.continueWorkout })
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

    // handleClickEdit = () => {
    //     this.setState({ edit: !this.state.edit })
    // }

    handleClickTouched = () => {
        this.setState({ touched: !this.state.touched })
    }

    handleClickComplete = event => {
        event.preventDefault()
        const { exerciseSetList = [], clearError, onUpdateExerciseSet } = this.context
        const setsToUpdate = Object.keys(this.state.updateSet).map(key => ({ id: Number(key), ...this.state.updateSet[key] }))
        const updateList = exerciseSetList.map(el => setsToUpdate.find(e => e.id === el.id) || el) 
        const displayList = exerciseSetList.map((item, i) => {
            return (item.id === updateList[i].id) && Object.assign({},item,updateList[i])})  
        
        clearError()        
        setsToUpdate.map(element => WorkoutApiService.updateExerciseSet(element)
            .then(this.handleClickContinue())
            .then(onUpdateExerciseSet(displayList))
            .then(console.log('hey'))
        )

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

    onSelectExerciseChange = (event) => {
        const { workout } = this.props
        this.setState({
            addExercise: {
                exercise_name: event.target.value,
                workout_id: workout.id
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
                // continueWorkout={this.state.continueWorkout}
                onRepetitionChange={this.onRepetitionChange}
                onWeightChange={this.onWeightChange}
                handleClickComplete={this.handleClickComplete}
        
            />
        )
    }

    renderNewExercises() {
        const { exerciseList = [] } = this.context
        const workoutExercises = exerciseList.filter(
            exercise => exercise.workout_id === this.props.workout.id)
        
        return workoutExercises.map(exercise => 
                <Exercise
                    key={exercise.id}
                    exercise={exercise}
                    newWorkout={this.props.newWorkout}
                    continueWorkout={this.state.continueWorkout}
                    onRepetitionChange={this.onRepetitionChange}
                    onWeightChange={this.onWeightChange}
                    handleClickComplete={this.handleClickComplete}        
                />
        )
    }
    
    renderWorkouts() {
        const { error } = this.context
        const { workout } = this.props
        
        if(this.props.newWorkout || this.state.continueWorkout) {
            return (
                <div>                       
                    <WorkoutDate workout={workout} />
                    {this.renderNewExercises()}
                    <form className='AddNewExerciseForm' onChange={this.onSelectExerciseChange}>
                            <label htmlFor='Exercise__select'>Select Exercise</label>
                            <select name='Exercise__select' id='Exercise__select'
                            // onChange={(event) => this.context.filterSelect(event.target.value)}
                            >
                                <option value=''>Select</option>
                                <option value='Squat'>Squat</option>
                                <option value='Bench'>Bench</option>
                                <option value='Row'>Row</option>
                                <option value='Deadlift'>DeadLift</option>
                                <option value='Military Press'>Military Press</option>
                                <option value='Clean'>Clean</option>
                            </select>

                    </form>
                    
                    {this.renderAddExerciseButton()}
                    {this.renderCompleteButton()} 
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
                    {/* {this.state.edit
                        ? this.renderUpdateButton()
                        : this.renderEditButton()
                    } */}
                    {this.state.continueWorkout
                        ? this.renderCompleteButton()
                        : this.renderContinueButton()
                    }
                    {/* {this.state.edit
                        ? this.renderCancelButton()
                        : ''
                    } */}
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
                onClick={this.handleClickAddExercise}
            >
                Add Exercise
            </Button>
        )
    }

    // renderCancelButton() {
    //     return (
    //         <Button 
    //             className='WorkoutItem__cancel' 
    //             type='button'
    //             onClick={this.handleClickEdit}
    //         >
    //             Cancel
    //         </Button>
    //     )
    // }

    renderCompleteButton() {
        return (
            <Button 
                className='WorkoutItem__complete' 
                type='button'
                onClick={this.handleClickComplete}
            >
                Complete
            </Button>
        )
    }

    renderContinueButton() {
        return (
            <Button 
                className='WorkoutItem__continue' 
                type='button'
                onClick={this.handleClickContinue}
            >
                Continue
            </Button>
        )
    }

    renderDeleteButton() {
        return (
            <Button 
                className='WorkoutItem__delete' 
                type='button'
                onClick={this.handleClickDelete}
            >
                Delete
            </Button>
        )
    }

    // renderDeleteExerciseButton() {
    //     return (
    //         <Button 
    //             className='ExerciseItem__delete' 
    //             type='button'
    //             onClick={this.handleClickDeleteExercise}
    //         >
    //             Delete
    //         </Button>
    //     )
    // }

    // renderEditButton() {
    //     return (
    //         <Button 
    //             className='WorkoutItem__edit' 
    //             type='button'
    //             onClick={this.handleClickEdit}
    //         >
    //             Edit
    //         </Button>
    //     )
    // }


    // renderUpdateButton() {
    //     return (
    //         <Button 
    //             className='WorkoutItem__update' 
    //             type='button'
    //             onClick={this.handleClickUpdate}
    //         >
    //             Update
    //         </Button>
    //     )
    // }

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