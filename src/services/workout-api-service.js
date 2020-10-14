import config from '../config'
import TokenService from './token-service'

const WorkoutApiService = {
    getWorkouts() {
        return fetch (`${config.API_ENDPOINT}/workout`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },            
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res.json()
            )
    },

    postWorkout() {
        return fetch (`${config.API_ENDPOINT}/workout`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },  
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res.json()
            )
    },

    getWorkoutItem(id) {
        return fetch (`${config.API_ENDPOINT}/workout/${id}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    deleteWorkout(id) {
        return fetch (`${config.API_ENDPOINT}/workout/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : null
            )
    },

    getExercises() {
        return fetch (`${config.API_ENDPOINT}/exercise`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },            
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res.json()
            )
    },

    postExercise(exercise) {
        return fetch (`${config.API_ENDPOINT}/exercise`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }, 
            body: JSON.stringify({
                workout_id: exercise.workout_id,
                exercise_name: exercise.exercise_name,
            }) 
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res.json()
            )
    },

    deleteExercise(id) {
        return fetch (`${config.API_ENDPOINT}/exercise/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : null
            )
    },

    updateExercise(update) {
        return fetch (`${config.API_ENDPOINT}/exercise/${update.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }, 
            body: JSON.stringify({
                exercise_name: update.exercise_name,
            }) 
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : null
            )
    },

    getExerciseSets() {
        return fetch (`${config.API_ENDPOINT}/set`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },            
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res.json()
            )
    },

    postExerciseSet(exerciseSet) {
        return fetch (`${config.API_ENDPOINT}/set`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }, 
            body: JSON.stringify({
                exercise_id: exerciseSet.exercise_id,
                set_weight: exerciseSet.set_weight,
                set_repetition: exerciseSet.set_repetition,
            }) 
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res.json()
            )
    },

    deleteExerciseSet(id) {
        return fetch (`${config.API_ENDPOINT}/set/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : null
            )
    },

    updateExerciseSet(update) {
        return fetch (`${config.API_ENDPOINT}/set/${update.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }, 
            body: JSON.stringify({
                set_weight: update.set_weight,
                set_repetition: update.set_repetition,
            }) 
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : null
            )
    },
}

export default WorkoutApiService