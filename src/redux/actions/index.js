export const GET_JOBS = 'GET_JOBS'
export const GET_JOBS_ERROR = 'GET_JOBS_ERROR'
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
export const DEL_FROM_FAVORITES = 'DEL_FROM_FAVORITES'

export const addToFavoritesAction = (job) => ({
    type: ADD_TO_FAVORITES,
    payload: job,
  })
  
  export const delFromFavoritesAction = (i) => ({
    type: DEL_FROM_FAVORITES,
    payload: i,
  })

export const getJobsAction = () => {

    return async (dispatch) => {
      try {
        let resp = await fetch('https://strive-jobs-api.herokuapp.com/jobs?limit=30')
        if (resp.ok) {
          console.log(resp)
          let jobs = await resp.json()
          dispatch({
            type: GET_JOBS,
            payload: jobs,
          })
        } else {
          dispatch({
            type: GET_JOBS_ERROR,
            payload: resp.status,
          })
          console.log('error')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }