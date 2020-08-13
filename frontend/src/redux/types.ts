import {Actions as HomeConfigurationActions} from "./reducers/home-configuration/types";
import {Actions as AppActions} from "./reducers/app/types";
import {Actions as HomesActions} from "./reducers/homes/types";
import {ThunkAction} from "redux-thunk";
import {RootReducer} from "./index";

export type AllActions = HomeConfigurationActions | AppActions | HomesActions;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootReducer,
    unknown,
    AllActions
    >
