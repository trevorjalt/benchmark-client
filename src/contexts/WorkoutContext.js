import React, { Component } from 'react'

const WorkoutContext = React.createContext({
    workoutList: [],
    exerciseList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setIsLoggedIn: () => {},
    setWorkoutList: () => {},
})
export default WorkoutContext

export class WorkoutProvider extends Component {
    state = {
        workoutList: [],
        exerciseList: [],
        error: null,
        isLoggedIn: false,
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

    setWorkoutList = workoutList => {
        this.setState({ workoutList})
    }

    setExerciseList = exerciseList => {
        this.setState({ exerciseList})
    }

    render() {
        const value = {
            workoutList: this.state.workoutList,
            exerciseList: this.state.exerciseList,
            error: this.state.error,
            isLoggedIn: this.state.isLoggedIn,
            setError: this.setError,
            clearError: this.clearError,
            setIsLoggedIn: this.setIsLoggedIn,
            setWorkoutList: this.setWorkoutList,
            setExerciseList: this.setExerciseList,          
        }
        return (
            <WorkoutContext.Provider value={value}>
                {this.props.children}
            </WorkoutContext.Provider>
        )
    }
}