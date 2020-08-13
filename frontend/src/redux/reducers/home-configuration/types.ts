export enum ActionTypes {
  SET_STATE = "SET_STATE",
  SET_LOADING = "SET_LOADING",
  SET_SAVED = "SET_SAVED",
  UPDATE = "UPDATE",
  SET_ACTIVE_OBJECT = "SET_ACTIVE_OBJECT",
  TOGGLE_IS_DRAGGING = "TOGGLE_IS_DRAGGING",
  UNDO = "UNDO",
  REMOVE_CONTROL_ELEMENT = "REMOVE_CONTROL_ELEMENT",
}

export enum ControlTypes {
  Switch = "Switch",
  Dimmer = "Dimmer",
  Power = "Power",
  Mode = "Mode"
}

export type State = Readonly<{
  controlObjects: ControlObject[];
  pastControlObjects: ControlObject[][];
  controlElements: NewControlElements;
  activeCard: number | null;
  isDragging: boolean;
  isLoading: boolean;
  isSaved: boolean;
}>;

export interface ControlObject {
  title: string;
  controlElements: ControlElements;
}

export interface ControlElements {
  Switch: boolean;
  Power: number;
  Dimmer?: number;
  [key: string]: any;
}

export interface NewControlElements {
  [key: string]: string[];
}

interface SetStateAction {
  type: ActionTypes.SET_STATE;
  controlObjects: ControlObject[];
  controlElements: NewControlElements;
}

interface UpdateStateByObjectIdAction {
  type: ActionTypes.UPDATE;
  index: number;
  name: string;
  value: any;
}

interface RemoveControlElementAction {
  type: ActionTypes.REMOVE_CONTROL_ELEMENT;
  name: string;
  index: number;
}

interface SetLoadingAction {
  type: ActionTypes.SET_LOADING;
}

interface SetActiveObjectAction {
  type: ActionTypes.SET_ACTIVE_OBJECT;
  index: number | null;
}

interface ToggleIsDraggingAction {
  type: ActionTypes.TOGGLE_IS_DRAGGING;
}

interface UndoAction {
  type: ActionTypes.UNDO;
}

interface SetSavedAction {
  type: ActionTypes.SET_SAVED;
}

export type Actions =
  | SetStateAction
  | UpdateStateByObjectIdAction
  | RemoveControlElementAction
  | SetLoadingAction
  | SetActiveObjectAction
  | ToggleIsDraggingAction
  | UndoAction
  | SetSavedAction;
