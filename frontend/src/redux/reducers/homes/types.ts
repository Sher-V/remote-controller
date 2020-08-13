export enum ActionTypes {
  SET_HOMES = "SET_HOMES",
}

export type State = Readonly<{
  homes: Home[];
}>;

export interface Home {
  _id: string;
  title: string;
}

interface SetHomesAction {
  type: ActionTypes.SET_HOMES;
  homes: Home[];
}

export type Actions = SetHomesAction;
