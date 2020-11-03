import { createSlice } from '@reduxjs/toolkit';

export const constantsSlice = createSlice({
  name: 'constants',
  initialState: {
    currentValue: '',
    lastValidValue: '',
    errorStr: ''
  },
  reducers: {
    update: (state, action) => {
      state.currentValue = action.payload;
    }
  }
});

export const { update } = constantsSlice.actions;

export const selectCurrentValue = state => state.constants.currentValue;
export const selectLastValidValue = state => state.constants.lastValidValue;
export const selectErrorStr = state => state.constants.errorStr;

export default constantsSlice.reducer;
