import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { fetchData } from './fetchData';


/* async actions */

export const fetchExercise = createAsyncThunk(
  'solveExercise/fetchExercise',
  async (exercise_id) => {
    const response = await fetchData(
      `/api/exercises/${exercise_id}`, 'GET', null
    );
    return response;
  }
);


/* slice */
export const solveExerciseSlice = createSlice({
  name: 'solveExercise',
  initialState: {
    exercise: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchExercise.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchExercise.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.exercise = action.payload;
    },
    [fetchExercise.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});


/* export actions */
//export const {} = solveExerciseSlice.actions;


/* selectors */

export const selectExercise = (state) => {
  return state.solveExercise.exercise;
};

export const selectStatus = (state) => {
  return state.solveExercise.status;
};

export const selectError = (state) => {
  return state.solveExercise.error;
};


export default solveExerciseSlice.reducer;
