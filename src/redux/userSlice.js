import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {fetchData} from "./fetchData";
//import { fetchData } from './fetchData';



/* async actions */

export const logIn = createAsyncThunk(
  'user/logIn',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      let data = {};
      data["username"] = username;
      data["password"] = password;
      let response = await fetchData(
          `/api/exercises/logIN`, 'POST', data
      );
    return response;
    } catch (err) {
      console.error(err)
      return rejectWithValue(err.message);
    }
  }
);
export const logInByGithub = createAsyncThunk(
  'user/logInByGithub',
  async ( _, { rejectWithValue }) => {
    try {
      let response = await fetchData(
          `/api/exercises/logInGithub`, 'GET',
      );
    return response;
    } catch (err) {
      console.error(err)
      return rejectWithValue(err.message);
    }
  }
);


/* slice */
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: null,
    
    status: 'idle',
    error: null,

    usernameValue: '',
    passwordValue: ''
  },
  reducers: {
    updateUsername: (state, action) => {
      state.usernameValue = action.payload;
    },
    updatePassword: (state, action) => {
      state.passwordValue = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = 'idle';
      state.error = '';
    }
  },
  extraReducers: {
    [logIn.pending]: (state, action) => {
      state.status = 'loading';
    },
    [logIn.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.usernameValue = '';
      state.passwordValue = '';
      if (action.payload) {
        state.user = action.payload;
        state.isLoggedIn = true;
      } else {
        state.error = '';
      }
    },
    [logIn.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = 'No such combination of username and password found.';
    }
  }
});


/* export actions */
export const {
  updateUsername,
  updatePassword,
  logOut
} = userSlice.actions;


export default userSlice.reducer;
