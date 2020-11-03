import { createSlice } from '@reduxjs/toolkit';

export const predicatesSlice = createSlice({
  name: 'predicates',
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

export const { update } = predicatesSlice.actions;

export const selectCurrentValue = state => state.predicates.currentValue;
export const selectLastValidValue = state => state.predicates.lastValidValue;
export const selectErrorStr = state => state.predicates.errorStr;

export default predicatesSlice.reducer;
