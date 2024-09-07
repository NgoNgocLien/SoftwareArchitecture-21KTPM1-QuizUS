import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    
})

const middleWare = [thunk];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWare),
});