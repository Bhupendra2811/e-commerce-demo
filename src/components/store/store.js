import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthData, { ProductApi } from './slices';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    // Add any other configuration options here
};

const rootReducer = combineReducers({
    AuthData: AuthData,
    [ProductApi.reducerPath]: ProductApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(ProductApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;
