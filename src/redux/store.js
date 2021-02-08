import { configureStore } from '@reduxjs/toolkit';
import addExerciseReducer from './addExerciseSlice';
import exercisesReducer from './exercisesSlice';
import solveExerciseReducer from './solveExerciseSlice';

export default configureStore({
  reducer: {
    addExercise: addExerciseReducer,
    exercises: exercisesReducer,
    solveExercise: solveExerciseReducer
  }
});
