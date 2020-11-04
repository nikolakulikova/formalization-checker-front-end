import { createSlice } from '@reduxjs/toolkit';
import { parseConstants } from '@fmfi-uk-1-ain-412/js-fol-parser';

export const constantsSlice = createSlice({
  name: 'constants',
  initialState: {
    currentValue: '',
    lastValidValue: '',
    errMessgage: '',
    constants: []
  },
  reducers: {
    update: (state, action) => {
      state.currentValue = action.payload;
      let arr = null;
      try {
        arr = parseConstants(state.currentValue);
      } catch (err) {
        state.errMessgage = err.message;
      }
      if (arr != null) {
        state.lastValidValue = state.currentValue;
        state.errMessgage = '';
        state.constants = arr;
      }
    }
  }
});

export const { update } = constantsSlice.actions;

export const selectCurrentValue = state => state.constants.currentValue;
export const selectErrMessage = state => state.constants.errMessgage;
export const selectConstants = state => state.constants.constants;

export default constantsSlice.reducer;
