// redux library
const redux = require('redux');
const combineReducers=  redux.combineReducers
const createStore = redux.legacy_createStore


// action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'

function buyCake() {
    return {
        type: BUY_CAKE
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM
    }
}


// reducer
const cake_state = {
    noOfCakes : 10
}
const  ice_cream_state = {
    noOfIceCream : 3
}

const cakeReducer = (state = cake_state , action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                noOfCakes: state.noOfCakes - 1
            }
        default:
            return {...state};
    }
}

const ice_CreamReducer = (state = ice_cream_state , action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state , 
                noOfIceCream : state.noOfIceCream - 1
            }
        default:
            return {...state};
    }
}

// combineReducers
const rootReducer = combineReducers({cake:cakeReducer, ice_cream: ice_CreamReducer})

// createstore
const store = createStore(rootReducer)


// getstate
console.log('initital state' , store.getState());
// subscribe (call when we use perform action)
store.subscribe(() => console.log('subscribe state',store.getState()))
// dispatch action
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
