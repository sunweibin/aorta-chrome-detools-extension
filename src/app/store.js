import { configureStore } from '@reduxjs/toolkit';
import networkReducer from '../reducers/network';

export const store = configureStore({
  reducer: {
    networkInfo: networkReducer,
  },
});
