import { ADD_TO_FAVORITES, DEL_FROM_FAVORITES } from '../actions'
import { initialState } from '../store'

const favoritesReducer = (state = initialState.favorites, action) => {

  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }

    case DEL_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((job, i) => i !== action.payload)
      }

    default:
      return state
  }
}

export default favoritesReducer