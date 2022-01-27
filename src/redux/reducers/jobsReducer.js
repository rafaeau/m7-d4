import { GET_JOBS, GET_JOBS_ERROR } from '../actions'
import { initialState } from '../store'

const jobsReducer = (state = initialState.jobs, action) => {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      }

    case GET_JOBS_ERROR:
      return {
        ...state,
        errorCode: action.payload,
      }

    default:
      return state
  }
}

export default jobsReducer