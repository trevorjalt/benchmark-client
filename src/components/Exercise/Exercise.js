import React, { Component } from 'react'
import WorkoutContext from '../../contexts/WorkoutContext'
import WorkoutApiService from '../../services/workout-api-service'
import { Button } from '../Utils/Utils'
import ExerciseSet from '../ExerciseSet/ExerciseSet'
import AddIcon from './images/add-exercise-set-icon.png'
import DeleteIcon from './images/delete-exercise-icon.png'
import EditIcon from './images/edit-exercise-icon.png'
import SubmitIcon from './images/submit-exercise-icon.png'
import './Exercise.css'


export default class Exercise extends Component {
    static contextType = WorkoutContext

    state = {
        editExerciseName: null,
        addExerciseSet: [],
        updateExerciseName: [],
    }

    componentDidMount() {
        this.context.clearError()
        WorkoutApiService.getExerciseSets()
            .then(this.context.setExerciseSetList)
            .catch(this.context.setError)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.addExerciseSet !== this.state.addExerciseSet) {
            this.context.clearError()
            WorkoutApiService.getExerciseSets()
                .then(this.context.setExerciseSetList)
                .catch(this.context.setError)

        }
    }

    handleClickAddExerciseSet = event => {
        event.preventDefault()
        const { clearError } = this.context
        const { exercise } = this.props
        const newExerciseSet = { set_weight: 0, set_repetition: 0, exercise_id: exercise.id}

        clearError()
        WorkoutApiService.postExerciseSet(newExerciseSet)
            .then(data => this.setState({ addExerciseSet: data }))
    }

    handleClickDeleteExercise = event => {
        event.preventDefault()
        const { exerciseList = [], onDeleteExercise, clearError } = this.context
        const { exercise } = this.props
        const newList = exerciseList.filter((item) => item.id !== exercise.id)

        clearError()
        WorkoutApiService.deleteExercise(exercise.id)
            .then(onDeleteExercise(newList))

    }

    handleClickEditExerciseName = () => {
        this.setState({ editExerciseName: !this.state.editExerciseName })
    }

    handleSubmitExerciseName = event => {
        event.preventDefault()
        const { exerciseList = [], clearError, onUpdateExercise } = this.context
        const displayList = exerciseList.map((item, i) => 
            item.id === this.state.updateExerciseName.id 
            ? Object.assign({},item,this.state.updateExerciseName) : item )

        clearError()
        WorkoutApiService.updateExercise(this.state.updateExerciseName)
            .then(onUpdateExercise(displayList))
            .then(this.setState({ editExerciseName: !this.state.editExerciseName }))
    }

    onSelectExerciseNameChange = (event) => {
        const { exercise } = this.props
        this.setState({
            updateExerciseName: {
                id: exercise.id,
                exercise_name: event.target.value,
            },
        })
    }

    renderExerciseSets() {
        const { exerciseSetList = [] } = this.context

        const exerciseSets = exerciseSetList.filter(
            exerciseSet => exerciseSet.exercise_id === this.props.exercise.id)
        return exerciseSets.map(exerciseSet =>
            <ExerciseSet
                key={exerciseSet.id}
                exerciseSet={exerciseSet}
                onRepetitionChange={this.props.onRepetitionChange}
                onWeightChange={this.props.onWeightChange}
                handleClickComplete={this.props.handleClickComplete}
                newWorkout={this.props.newWorkout}
                continueWorkout={this.props.continueWorkout}
            />       
        )
    }

    renderExerciseState() {
        const { error } = this.context
        const { continueWorkout, exercise, newWorkout } = this.props

        if (this.state.editExerciseName) {
            return (
                <div>
                    <div className='ExerciseNameUpdate'>
                <form className='EditExerciseNameForm' onChange={this.onSelectExerciseNameChange}>
                        <label htmlFor='ExerciseName__select'></label>
                        <select name='ExerciseName__select' id='ExerciseName__select' className='ExerciseName__select'>
                            <option value=''>Select Name</option>
                            <option value='Squat'>Squat</option>
                            <option value='Bench'>Bench</option>
                            <option value='Row'>Row</option>
                            <option value='Deadlift'>DeadLift</option>
                            <option value='Military Press'>Military Press</option>
                            <option value='Clean'>Clean</option>
                        </select>

                </form>
                
                    {this.renderSubmitExerciseNameButton()}
                </div>
                <section className='MyExerciseSets'>
                        {error
                        ? <p className='red'>Whoops! There was an error</p>
                        : this.renderExerciseSets()}
                </section>
                <div className='ExerciseSetItem__buttons'>
                    {this.renderAddExerciseSetButton()}    
                </div>      
            </div>
                
            ) 
        } else if (continueWorkout || newWorkout) {
            return (
                <div>
                    <div className='ExerciseItem___header'>
                        <h2 className='ExerciseItem__name-in-progress'>{exercise.exercise_name}</h2>
                        {this.renderEditExerciseNameButton()}
                        {this.renderDeleteExerciseButton()}
                    </div>
                    <section className='MyExerciseSets'>
                            {error
                            ? <p className='red'>Whoops! There was an error</p>
                            : this.renderExerciseSets()}
                    </section>
                    <div className='ExerciseSetItem__buttons'>
                        {this.renderAddExerciseSetButton()}
                    </div>
                </div>
            )
        } else {
            return (
                <div className='ExerciseItem'>
                    <div className='ExerciseItem___header'>
                        <h2 className='ExerciseItem__name'>{exercise.exercise_name}</h2>
                    </div>
                    <section list className='MyExerciseSets'>
                            {error
                            ? <p className='red'>Whoops! There was an error</p>
                            : this.renderExerciseSets()}
                    </section>             
                </div>
            )            
        }
    }

    renderAddExerciseSetButton() {
        return (
            <Button 
                className='ExerciseSetItem__add' 
                type='button'
                onClick={this.handleClickAddExerciseSet}
            >
                <img src={AddIcon} alt='Add exercise set icon' className='ExerciseSetItem__add-icon' />
                Set
            </Button>
        )
    }

    renderDeleteExerciseButton() {
        return (
            <Button 
                className='ExerciseItem__delete' 
                type='button'
                onClick={this.handleClickDeleteExercise}
            >
                <img src={DeleteIcon} alt='Delete exercise icon' className='ExerciseItem__delete-icon' />
            </Button>
        )
    }

    renderEditExerciseNameButton() {
        return (
            <Button 
                className='ExerciseItem__edit' 
                type='button'
                onClick={this.handleClickEditExerciseName}
            >
                <img src={EditIcon} alt='Edit exercise name icon' className='ExerciseItem__edit-icon' />
            </Button>
        )
    }

    renderSubmitExerciseNameButton() {
        return (
            <Button 
                className='ExerciseItem__submit' 
                type='button'
                onClick={this.handleSubmitExerciseName}
            >
                <img src={SubmitIcon} alt='Submit exercise name icon' className='ExerciseItem__submit-icon' />
            </Button>
        )
    }

    render() {
        return (
            <div className='ExerciseSet__item'>
                {this.renderExerciseState()}
            </div>
        )
    }
}