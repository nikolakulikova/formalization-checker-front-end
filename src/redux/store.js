import { configureStore } from '@reduxjs/toolkit';
import addExerciseReducer from './addExerciseSlice';
import solveExerciseReducer from './solveExerciseSlice';

export default configureStore({
  reducer: {
    addExercise: addExerciseReducer,
    solveExercise: solveExerciseReducer
  }
});
