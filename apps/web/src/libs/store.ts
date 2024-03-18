import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import adminSlice from './features/adminSlice';

export const makeStore = () => {
  return configureStore({
    reducer: { user: userSlice, admin: adminSlice },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
