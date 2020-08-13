import { Actions, ActionTypes, State } from "./types";

const initialState: State = {
  isLoading: false,
  error: null,
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: !state.isLoading };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.HIDE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
