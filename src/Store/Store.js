import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
    batchActions,
    enableBatching
} from 'redux-batched-actions';
import reducer from '../Redux/Reducer';

function createReducer(asyncReducers) {
    let rootReducer = enableBatching(combineReducers({
        reducer,
        ...asyncReducers
    }))
    return (state,action)=>{
        console.log(action)
        return rootReducer(state, action)
    }
    
}


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers( reducer ), {},
    applyMiddleware(sagaMiddleware)
)

if (__DEV__) {
    store.subscribe(() =>
        console.log(store.getState())
    )
}

store.asyncReducers = {};

export function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}

export {
    store,
    sagaMiddleware,
    batchActions
};