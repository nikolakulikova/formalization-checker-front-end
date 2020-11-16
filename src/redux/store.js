import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import propositionsReducer from './propositionsSlice';

export default configureStore({
  reducer: {
    language: languageReducer,
    propositions: propositionsReducer
  }
});
