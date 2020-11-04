import { createSlice } from '@reduxjs/toolkit';
import { parseConstants } from '@fmfi-uk-1-ain-412/js-fol-parser';

export const constantsSlice = createSlice({
  name: 'constants',
  initialState: {
    currentValue: '',
    lastValidValue: '',
    errMessgage: ''
  },
  reducers: {
    update: (state, action) => {
      state.currentValue = action.payload;
      let constants = null;
      try {
        constants = parseConstants(state.currentValue);
      } catch (err) {
        state.errMessgage = err.message;
      }
      if (constants != null) {
        state.lastValidValue = state.currentValue;
        state.errMessgage = '';
      }
    }
  }
});

export const { update } = constantsSlice.actions;

export const selectCurrentValue = state => state.constants.currentValue;
export const selectErrMessage = state => state.constants.errMessgage;

export default constantsSlice.reducer;
