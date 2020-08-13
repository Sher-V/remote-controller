import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as homeConfigurationReducer } from "./reducers/home-configuration";
import { reducer as appReducer } from "./reducers/app";
import { reducer as homesReducer } from "./reducers/homes";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  appReducer,
  homesReducer,
  homeConfigurationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootReducer = ReturnType<typeof rootReducer>;

export default store;
