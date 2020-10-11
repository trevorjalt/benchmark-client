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
    // setNewWorkoutItem: () => {},
    // onAddExercise: () => {},
    onDeleteWorkout: () => {},
    onUpdateWorkoutSets: () => {},
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

    // setNewWorkoutItem = newWorkoutItem => {
    //     this.setState({ newWorkoutItem})
    // }

    // onAddExercise = (value) => {
    //     this.setExerciseList({ value })
    // }

    onDeleteWorkout = (value) => {
        this.setWorkoutList(value)
    }

    onUpdateWorkoutSets = (value) => {
        this.setExerciseSetList(value)
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
            // setNewWorkoutItem: this.setNewWorkoutItem,
            // onAddExercise: this.onAddExercise,
            onDeleteWorkout: this.onDeleteWorkout,
            onUpdateWorkoutSets: this.onUpdateWorkoutSets,         
        }
        return (
            <WorkoutContext.Provider value={value}>
                {this.props.children}
            </WorkoutContext.Provider>
        )
    }
}