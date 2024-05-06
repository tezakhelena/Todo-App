// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import zadaciReducer from './ZadaciSlice';
import NotifikacijaReducer from './NotifikacijeSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const zadaciPersistConfig = {
  key: 'tasks',
  storage,
};

const notifikacijePersistConfig = {
  key: 'notifikacija',
  storage,
};

const persistedReducer = persistReducer(zadaciPersistConfig, zadaciReducer);
const persistedReducerNotifications = persistReducer(notifikacijePersistConfig, NotifikacijaReducer);

const rootReducer = combineReducers({
  tasks: persistedReducer,
  notifikacije: persistedReducerNotifications
  // Dodajte druge reducere ovdje prema potrebi
});

export type RootState = ReturnType<typeof rootReducer>;



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);

export default store;
