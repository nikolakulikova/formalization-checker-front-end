import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { fetchData } from './fetchData';


/* async actions */

export const fetchAllExercises = createAsyncThunk(
  'solveExercise/fetchAllExercises',
  async () => {
    const response = await fetchData(
      '/api/exercises', 'GET', null
    );
    return response;
  }
);

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
    exercises: [],
    status: 'idle',
    error: null,
    selectedExerciseID: null,
    selectedExercise: null
  },
  reducers: {
    chooseExercise: (state, action) => {
      state.selectedExerciseID = action.payload;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: {
    [fetchAllExercises.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAllExercises.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.exercises = state.exercises.concat(action.payload);
    },
    [fetchAllExercises.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },

    [fetchExercise.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchExercise.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.selectedExercise = action.payload;
    },
    [fetchExercise.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});


/* export actions */
export const {
  chooseExercise
} = solveExerciseSlice.actions;


/* selectors */

export const selectAllExercises = (state) => {
  return state.solveExercise.exercises;
};

export const selectStatus = (state) => {
  return state.solveExercise.status;
};

export const selectError = (state) => {
  return state.solveExercise.error;
};

export const selectExerciseID = (state) => {
  return state.solveExercise.selectedExerciseID;
};

export const selectExercise = (state) => {
  return state.solveExercise.selectedExercise;
};


export default solveExerciseSlice.reducer;
