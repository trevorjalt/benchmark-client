import React, { Component } from 'react'

const WorkoutContext = React.createContext({
    workoutList: [],
    exerciseList: [],
    exerciseSetList: [],
    newWorkoutItem: {},
    error: null,
    isLoggedIn: null,
    clearError: () => {},
    setError: () => {},
    setIsLoggedIn: () => {},
    setWorkoutList: () => {},
    setExerciseList: () => {},
    onDeleteExercise: () => {},
    onDeleteExerciseSet: () => {},
    onDeleteWorkout: () => {},
    onUpdateExercise: () => {},
    onUpdateExerciseSet: () => {},
})
export default WorkoutContext

export class WorkoutProvider extends Component {
    state = {
        workoutList: [],
        exerciseList: [],
        exerciseSetList: [],
        newWorkoutItem: {},
        error: null,
        isLoggedIn: null,
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    setIsLoggedIn = (value) => {
        this.setState({ isLoggedIn: value })
    }

    setWorkoutList = workoutList => {
        this.setState({ workoutList})
    }

    setExerciseList = exerciseList => {
        this.setState({ exerciseList})
    }

    setExerciseSetList = exerciseSetList  => {
        this.setState({ exerciseSetList })
    }

    onDeleteExercise = (newList) => {
        this.setExerciseList(newList)
    }

    onDeleteExerciseSet = (newList) => {
        this.setExerciseSetList(newList)
    }

    onDeleteWorkout = (newList) => {
        this.setWorkoutList(newList)
    }

    onUpdateExercise = (newList) => {
        this.setExerciseList(newList)
    }

    onUpdateExerciseSet = (newList) => {
        this.setExerciseSetList(newList)
    }

    render() {
        const value = {
            workoutList: this.state.workoutList,
            exerciseList: this.state.exerciseList,
            exerciseSetList: this.state.exerciseSetList,
            newWorkoutItem: this.state.newWorkoutItem,
            error: this.state.error,
            isLoggedIn: this.state.isLoggedIn,
            touched: this.state.touched,
            clearError: this.clearError,
            setError: this.setError,
            setIsLoggedIn: this.setIsLoggedIn,
            setWorkoutList: this.setWorkoutList,
            setExerciseList: this.setExerciseList, 
            setExerciseSetList: this.setExerciseSetList,
            onDeleteExercise: this.onDeleteExercise,
            onDeleteExerciseSet: this.onDeleteExerciseSet,
            onDeleteWorkout: this.onDeleteWorkout,
            onUpdateExercise: this.onUpdateExercise,
            onUpdateExerciseSet: this.onUpdateExerciseSet,         
        }
        return (
            <WorkoutContext.Provider value={value}>
                {this.props.children}
            </WorkoutContext.Provider>
        )
    }
}