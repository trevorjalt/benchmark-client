import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import AddExerciseIcon from './images/add-exercise-icon.png'
import CompleteIcon from './images/complete-workout-icon.png'
import ContinueIcon from './images/continue-workout-icon.png'
import DeleteIcon from './images/delete-workout-icon2.png'
import { NiceDate, Button } from '../Utils/Utils'
import { parseISO } from 'date-fns'
import Exercise from '../Exercise/Exercise'
import './Workout.css'


export default class Workout extends Component {
    static contextType = WorkoutContext

    state = { 
        continueWorkout: null,
        error: null,
        redirect: null,
        touched: null,
        exerciseNameValue: '',
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

            WorkoutApiService.getExercises()
                .then(this.context.setExerciseList)
                .catch(this.context.setError)
        }
    }

    handleClickAddExercise = event => {
        event.preventDefault()

        if(this.state.exerciseNameValue === '') {
            this.setState({ error: 'Please select an exercise from the dropdown menu' })
        } else {
            this.setState({ error: null })
            WorkoutApiService.postExercise(this.state.addExercise)
            .then(exercise => this.setState(
                {newExerciseList: [...this.state.newExerciseList, exercise]}))
        }
    }

    handleClickComplete = (event) => {
        event.preventDefault()
        const { exerciseSetList = [], onUpdateExerciseSet } = this.context
        const setsToUpdate = Object.keys(this.state.updateSet).map(key => ({ id: Number(key), ...this.state.updateSet[key] }))
        const updateList = exerciseSetList.map(el => setsToUpdate.find(e => e.id === el.id) || el) 
        const displayList = exerciseSetList.map((item, i) => {
            return (item.id === updateList[i].id) && Object.assign({},item,updateList[i])})  
        
        if (Object.keys(this.state.updateSet).length === 0) {
            this.setState({ redirect: true })
            this.handleClickContinue()
            return
        } else {
            this.setState({ error: null })       
            setsToUpdate.map(element => WorkoutApiService.updateExerciseSet(element)
                .then(this.handleClickContinue())
                .then(onUpdateExerciseSet(displayList))
                .then(this.setState({ redirect: true }))     
            )           
        }
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
    }

    handleClickTouched = () => {
        this.setState({ touched: !this.state.touched })
    }

    handleKeyPressed = event => {
        if (event.key === 'Enter') {
            this.handleClickTouched()
        }
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
            },
        })
    }

    onSelectExerciseChange = (event) => {
        const { workout } = this.props
        this.setState({
            addExercise: {
                exercise_name: event.target.value,
                workout_id: workout.id
            },
            exerciseNameValue: event.target.value,
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
            },
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
        const { error } = this.state
        const { workout } = this.props
        
        if(this.props.newWorkout || this.state.continueWorkout) {
            return (
                <div>                     
                    <WorkoutDate workout={workout} /> 
                    <div className='MyExercises'>
                        {this.renderNewExercises()}
                    </div>
                    <div className='error-message' role='alert'>
                            {error && <p className='red'>{error}</p>}
                    </div>
                    <form className='AddNewExerciseForm' onChange={this.onSelectExerciseChange}>
                            <label htmlFor='Exercise__select'>Select Exercise:</label>
                            <select name='Exercise__select' id='Exercise__select' className='Exercise__select'>
                                <option value=''>Select</option>
                                <option value='Squat'>Squat</option>
                                <option value='Bench'>Bench</option>
                                <option value='Row'>Row</option>
                                <option value='Deadlift'>DeadLift</option>
                                <option value='Military Press'>Military Press</option>
                                <option value='Clean'>Clean</option>
                            </select>
                    </form>
                    <div className="WorkoutItem__buttons">
                        {this.renderAddExerciseButton()}
                        {this.renderCompleteButton()}
                    </div> 
                </div>
            )
        } else if (this.state.touched) {
            return (
                <div>
                    <div 
                        key={workout.id} 
                        tabIndex='0'
                        role='button'
                        aria-expanded='false'
                        onKeyDown={this.handleKeyPressed}
                    >                         
                        <WorkoutDate workout={workout} />
                    </div>
                    <div>
                    <section className='MyExercises'>
                        {error
                        ? <p className='red'>Whoops! There was an error</p>
                        : this.renderExercises()}
                    </section>
                    </div>
                    <div className="WorkoutItem__buttons">
                        {this.state.continueWorkout
                            ? this.renderCompleteButton()
                            : this.renderContinueButton()
                        }
                        {this.renderDeleteButton()}  
                    </div>
                </div>    
            )
            } else {
                return (
                    <div 
                        key={workout.id} 
                        tabIndex='0'
                        role='button'
                        aria-expanded='false'
                        onKeyDown={this.handleKeyPressed}
                    >                      
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
                <img src={AddExerciseIcon} alt='Add exercise icon' className='ExerciseItem__add-icon' />
                Exercise
            </Button>
        )
    }

    renderCompleteButton() {
        return (
            <Button 
                className='WorkoutItem__complete' 
                type='button'
                onClick={this.handleClickComplete}
            >
                <img src={CompleteIcon} alt='Complete workout icon' className='WorkoutItem__complete-icon' />
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
                <img src={ContinueIcon} alt='Continue workout icon' className='WorkoutItem__continue-icon' />
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
                <img src={DeleteIcon} alt='Delete workout icon' className='WorkoutItem__delete-icon' />
                Delete
            </Button>
        )
    }

    render() {
        if (this.state.redirect && this.props.newWorkout) {
            return <Redirect push to='/myworkouts' />
        } else {
        return (
            <div className='Workout__item' onDoubleClick={this.handleClickTouched}>                    
                {this.renderWorkouts()}
            </div>    
        )
        }
    }
}

function WorkoutDate({ workout }) {
    return (
        <h2 className='WorkoutItem__date'>
            <NiceDate
                date={parseISO(workout.date_created)}
            />
        </h2>
    )
}