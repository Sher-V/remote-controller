import {
  Actions,
  ActionTypes,
  ControlObject,
  NewControlElements,
} from "./types";
import { Dispatch } from "redux";
import { setError, setIsLoading } from "../app/actions";
import { api } from "../../../api";
import { RootReducer } from "../../index";
import { AllActions, AppThunk } from "../../types";

export const getHomeConfiguration = (id: string): AppThunk => async (
  dispatch
) => {
  dispatch(setIsLoading());
  try {
    const response = await api.getHomeConfiguration(id);
    if (response.status === 200) {
      dispatch(
        setState(response.data.controlObjects, response.data.controlElements)
      );
      dispatch(setIsLoading());
    } else throw new Error("error");
  } catch (e) {
    dispatch(setIsLoading());
    dispatch(setError("Error"));
  }
};

export const save = (id: string): AppThunk => async (
  dispatch: Dispatch<AllActions>,
  getState: () => RootReducer
) => {
  const {
    homeConfigurationReducer: { controlObjects },
  } = getState();
  dispatch(setIsLoading());
  try {
    const response = await api.saveHomeConfiguration(id, controlObjects);
    if (response.status === 200) {
      dispatch(setIsLoading());
      dispatch(setSaved());
    } else throw new Error("error");
  } catch (e) {
    dispatch(setIsLoading());
    dispatch(setError("Error"));
  }
};

const setState = (
  controlObjects: ControlObject[],
  controlElements: NewControlElements
): Actions => ({
  type: ActionTypes.SET_STATE,
  controlObjects,
  controlElements,
});

export const setSaved = (): Actions => ({
  type: ActionTypes.SET_SAVED,
});

export const updateControlElementsByObjectId = (
  index: number,
  name: string,
  value: any
): Actions => ({
  type: ActionTypes.UPDATE,
  index,
  name,
  value,
});

export const removeControlElement = (name: string, index: number): Actions => ({
  type: ActionTypes.REMOVE_CONTROL_ELEMENT,
  name,
  index,
});

export const setLoading = (): Actions => ({
  type: ActionTypes.SET_LOADING,
});

export const setActiveObject = (index: number | null): Actions => ({
  type: ActionTypes.SET_ACTIVE_OBJECT,
  index,
});

export const toggleIsDragging = (): Actions => ({
  type: ActionTypes.TOGGLE_IS_DRAGGING,
});

export const undo = (): Actions => ({
  type: ActionTypes.UNDO,
});
