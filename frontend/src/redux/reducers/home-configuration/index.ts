import { Actions, ActionTypes, State } from "./types";

export const initialState: State = {
  controlObjects: [],
  controlElements: {},
  pastControlObjects: [],
  activeCard: null,
  isDragging: false,
  isLoading: false,
  isSaved: false,
};

export const reducer = (state = initialState, action: Actions): State => {
  const { controlObjects, pastControlObjects, isLoading, isDragging } = state;
  switch (action.type) {
    case ActionTypes.SET_STATE:
      return {
        ...state,
        controlObjects: action.controlObjects,
        controlElements: action.controlElements,
      };
    case ActionTypes.UPDATE:
      const controlElements = {
        ...controlObjects[action.index].controlElements,
        [action.name]: action.value,
      };
      return updateControlElementsByObjectId(
        state,
        action.index,
        controlElements
      );
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: !isLoading };
    case ActionTypes.SET_ACTIVE_OBJECT:
      return { ...state, activeCard: action.index };
    case ActionTypes.TOGGLE_IS_DRAGGING:
      return { ...state, isDragging: !isDragging };
    case ActionTypes.REMOVE_CONTROL_ELEMENT:
      const { [action.name]: val, ...rest } = controlObjects[
        action.index
      ].controlElements;
      return updateControlElementsByObjectId(state, action.index, rest);
    case ActionTypes.SET_SAVED:
      return {
        ...state,
        pastControlObjects: [],
        isSaved: !state.isSaved,
      };
    case ActionTypes.UNDO:
      const previous = pastControlObjects[pastControlObjects.length - 1];
      const newPast = pastControlObjects.slice(
        0,
        pastControlObjects.length - 1
      );
      return {
        ...state,
        controlObjects: previous,
        pastControlObjects: newPast,
      };
    default:
      return state;
  }
};

const updateControlElementsByObjectId = (
  state: State,
  index: number,
  controlElements: any
) => ({
  ...state,
  pastControlObjects: [...state.pastControlObjects, state.controlObjects],
  controlObjects: [
    ...state.controlObjects.slice(0, index),
    { ...state.controlObjects[index], controlElements },
    ...state.controlObjects.slice(index + 1),
  ],
});
