import {Actions, ActionTypes} from "./types";

export const setIsLoading = (): Actions => ({
  type: ActionTypes.SET_IS_LOADING,
});

export const setError = (error?: any): Actions => ({
  type: ActionTypes.SET_ERROR,
  error,
});

export const hideError = (): Actions => ({
  type: ActionTypes.HIDE_ERROR
})
