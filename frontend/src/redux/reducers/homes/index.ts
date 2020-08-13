import { Actions, ActionTypes, State } from "./types";

const initialState: State = {
  homes: [],
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.SET_HOMES:
      return { homes: [...action.homes] };
    default:
      return state;
  }
};
