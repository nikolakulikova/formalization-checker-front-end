import { configureStore } from '@reduxjs/toolkit';
import newExerciseReducer from './newExerciseSlice';

export default configureStore({
  reducer: {
    newExercise: newExerciseReducer
  }
});
