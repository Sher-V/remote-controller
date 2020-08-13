export enum ActionTypes {
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
  HIDE_ERROR = "HIDE_ERROR",
}

export type State = Readonly<{
  isLoading: boolean;
  error: any;
}>;

interface SetIsLoadingAction {
  type: ActionTypes.SET_IS_LOADING;
}

interface SetErrorAction {
  type: ActionTypes.SET_ERROR;
  error: any;
}

interface HideErrorAction {
  type: ActionTypes.HIDE_ERROR;
}

export type Actions = SetIsLoadingAction | SetErrorAction | HideErrorAction;
