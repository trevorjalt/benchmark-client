import React, { Component } from 'react'

const WorkoutContext = React.createContext({
    workoutList: [],
    exerciseList: [],
    exerciseSetList: [],
    error: null,
    isLoggedIn: null,
    touched: null,
    setError: () => {},
    clearError: () => {},
    setIsLoggedIn: () => {},
    setTouched: () => {},
    setWorkoutList: () => {},
    setExerciseList: () => {},
})
export default WorkoutContext

export class WorkoutProvider extends Component {
    state = {
        workoutList: [],
        exerciseList: [],
        exerciseSetList: [],
        error: null,
        isLoggedIn: null,
        touched: null
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setIsLoggedIn = (value) => {
        this.setState({ isLoggedIn: value })
    }

    setTouched = () => {
        this.setState({ touched: !this.state.touched })
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

    render() {
        const value = {
            workoutList: this.state.workoutList,
            exerciseList: this.state.exerciseList,
            exerciseSetList: this.state.exerciseSetList,
            error: this.state.error,
            isLoggedIn: this.state.isLoggedIn,
            touched: this.state.touched,
            setError: this.setError,
            clearError: this.clearError,
            setIsLoggedIn: this.setIsLoggedIn,
            setTouched: this.setTouched,
            setWorkoutList: this.setWorkoutList,
            setExerciseList: this.setExerciseList, 
            setExerciseSetList: this.setExerciseSetList,         
        }
        return (
            <WorkoutContext.Provider value={value}>
                {this.props.children}
            </WorkoutContext.Provider>
        )
    }
}