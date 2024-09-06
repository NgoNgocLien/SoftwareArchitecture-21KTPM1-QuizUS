import { combineReducers } from "redux";
import {thunk } from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from "./reducers/UserReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";

const rootReducer = combineReducers({
    UserReducer,
    LoadingReducer
})

const middleWare = [thunk];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWare),
});