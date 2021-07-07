import { useEffect, useReducer } from 'react';

export default function useFetch(url) {
    let [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'LOADING': {
        return { ...state, loading: true }
      }
      case 'RESOLVED': {
        return {
          ...state,
          loading: false,
          response: action.response,
          error: null
        }
      }
      case 'ERROR': {
        return {
          ...state,
          loading: false,
          response: null,
          error: action.error
        }
      }
      default:
        return state
    }
  }, {
    loading: false,
    response: null,
    error: null
  })
  
  useEffect(() => {
    let isCurrent = true
    dispatch({ type: "LOADING" })
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (isCurrent) {
          dispatch({ type: "RESOLVED", response: json })
        }
      }).catch(error => {
        dispatch({ type: "ERROR", error })
      })
    return () => {
      isCurrent = false
    }
  }, [])
  
  return [state.loading, state.response, state.error]
}