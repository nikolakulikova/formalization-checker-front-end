import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {
  parseConstants,
  parsePredicates,
  parseFunctions,
  parseFormulaWithPrecedence
} from '@fmfi-uk-1-ain-412/js-fol-parser';
import { fetchData } from './fetchData';
import {
  arrayToArityMap,
  parseFormalization
} from './helpers';


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
    constants: [],
    predicates: [],
    functions: [],
    solutions: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    update: {
      reducer: (state, action) => {
        const { value, id } = action.payload;
        state.solutions.find(x => x.proposition_id === id).formalization = value;
      },
      prepare: (value, id) => {
        return { payload: { value, id } };
      }
    }
  },
  extraReducers: {
    [fetchExercise.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchExercise.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.exercise = action.payload;
      state.constants = parseConstants(state.exercise.constants);
      state.predicates = parsePredicates(state.exercise.predicates);
      state.functions = parseFunctions(state.exercise.functions);
      for (let p of state.exercise.propositions) {
        state.solutions.push({
          proposition_id: p.proposition_id,
          formalization: ''
        });
      }
    },
    [fetchExercise.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});


/* export actions */
export const {
  update
} = solveExerciseSlice.actions;


/* selectors */

export const selectExercise = (state) => {
  return state.solveExercise.exercise;
};

export const selectFormalization = (state, id) => {
  const value = state.solveExercise.solutions.find(
    x => x.proposition_id === id
  ).formalization;

  let error = parseFormalization(
    value, new Set(state.solveExercise.constants),
    arrayToArityMap(state.solveExercise.predicates),
    arrayToArityMap(state.solveExercise.functions),
    parseFormulaWithPrecedence
  );

  return { value, error };
};

export const selectStatus = (state) => {
  return state.solveExercise.status;
};

export const selectError = (state) => {
  return state.solveExercise.error;
};


export default solveExerciseSlice.reducer;
