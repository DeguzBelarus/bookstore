import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookStoreReducer from './bookStoreSlice';

export const store = configureStore({
   reducer: {
      bookStore: bookStoreReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
