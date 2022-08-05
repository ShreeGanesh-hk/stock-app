import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from './features/loading';
import loginReducer from './features/login';
import appReducer from './features/app';
import stocksReducer from './features/stocks';
import exceptionReducer from './features/exception';



export const store = configureStore({
    reducer: {
        loadingIndicator: loadingReducer,
        login: loginReducer,
        app:appReducer,
        stocks:stocksReducer,
        exception:exceptionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
