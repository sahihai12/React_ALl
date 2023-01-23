const { default: axios } = require("axios")
const redux = require("redux")
const reduxthunk = require("redux-thunk").default

const createStore = redux.legacy_createStore
const applyMiddleware = redux.applyMiddleware

// actions 
const  FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
FETCH_USERS_SUCESS = 'FETCH_USERS_SUCESS',
FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetch_user_request = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}
const fetch_user_failure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        // payload: error
    }
}
const fetch_user_sucess = (users) => {
    return {
        type: FETCH_USERS_SUCESS,
        payload: users
    }
}

// reducer 
const inititalState = {
    loading: false,
    error: '',
    data : []
}

const usersReducer = (state = inititalState , action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state, 
                loading: true
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload
            }
        case FETCH_USERS_SUCESS:
            return {
                ...state, 
                loading: false,
                data: action.payload
            }
        default: return{...state}
    }
} 

const fetchusers = () => {
    return async (dispatch) => {
        dispatch(fetch_user_request())
        try {
            const res =  await axios.get('https://jsonplaceholder.typicode.com/users')
            dispatch(fetch_user_sucess(res.data))
        } catch (err) {
            dispatch(fetch_user_failure(err))
        }
       
    }
}

const store = createStore(usersReducer , applyMiddleware(reduxthunk))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchusers())


