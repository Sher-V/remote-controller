import { api } from "../../../api";
import { Actions, ActionTypes, Home } from "./types";
import { setError, setIsLoading } from "../app/actions";
import { AppThunk } from "../../types";

export const getHomes = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading());
  try {
    const response = await api.getHomes();
    if (response.status === 200) {
      dispatch(setHomes(response.data));
      dispatch(setIsLoading());
    } else throw new Error("error");
  } catch (e) {
    dispatch(setIsLoading());
    dispatch(setError("Error"));
  }
};

const setHomes = (homes: Home[]): Actions => ({
  type: ActionTypes.SET_HOMES,
  homes,
});
