import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { fetchData } from './fetchData';


/* async actions */

export const fetchAllUsersToProposition = createAsyncThunk(
    'exercises/fetchAllUsersToProposition',
    async (proposition_id, { rejectWithValue }) => {
      try {
        let response = await fetchData(`/api/exercises/progress/${proposition_id}`, 'GET');
        return response;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);
export const fetchUsersSolutions = createAsyncThunk(
    'exercises/fetchUsersSolutions',
    async ({proposition_id, user_id}, { rejectWithValue }) => {
      try {
        let response = await fetchData(`/api/exercises/progress/user/${user_id}/${proposition_id}`, 'GET');
        return response;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);


/* slice */
export const progressPropositionsSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    solutions: []
  },
  reducers: {},
  extraReducers: {
    [fetchAllUsersToProposition.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAllUsersToProposition.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    },
    [fetchAllUsersToProposition.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [fetchUsersSolutions.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUsersSolutions.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.solutions = action.payload;
    },
    [fetchUsersSolutions.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});


/* selectors */

export const selectUsers = (state) => {
  return state.propositions.users;
};

export const selectProposition = (state) => {
  if(state.propositions.users[0] !== undefined){
    return state.propositions.users[0].proposition_id;
  }
  return null;
};

export const selectUsersSolution = (state) => {
  return state.propositions.solutions;
};

export const selectStatus = (state) => {
  return state.propositions.status;
};

export const selectError = (state) => {
  return state.propositions.status;
};


export default progressPropositionsSlice.reducer;
