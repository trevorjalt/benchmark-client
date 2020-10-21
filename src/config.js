let apiPath
let tokenKey

if (process.env.NODE_ENV === 'production') {
    apiPath = 'https://still-fjord-98440.herokuapp.com/api'
    tokenKey = 'benchmark-client-auth-token'
} else {
    apiPath = 'http://localhost:8000/api'
    tokenKey = 'benchmark-client-auth-token'
}

export default {
    API_ENDPOINT: apiPath,
    TOKEN_KEY: tokenKey,
}