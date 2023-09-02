import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import coinReducer from '../redux/market/coinSlice';

const middlewares = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
});

if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
}

export const store = configureStore({
    reducer: {
        coin: coinReducer,
    },
    middleware: middlewares,
});
