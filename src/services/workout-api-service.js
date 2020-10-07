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

    updateWorkoutSet(update) {
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
}

export default WorkoutApiService