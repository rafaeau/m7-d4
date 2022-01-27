import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import jobsReducer from '../reducers/jobsReducer'
import favoritesReducer from '../reducers/favoritesReducer'

const composeThatAlwaysWorks = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
    jobs: [],
    favorites: [],
}

const bigReducer = combineReducers({
    jobs: jobsReducer,
    favorites: favoritesReducer,
  })

let configureStore = createStore(
  bigReducer,
  initialState,
  composeThatAlwaysWorks(applyMiddleware(thunk))
)

export default configureStore