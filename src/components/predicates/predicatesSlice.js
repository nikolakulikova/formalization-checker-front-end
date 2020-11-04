import { createSlice } from '@reduxjs/toolkit';
import { parsePredicates } from '@fmfi-uk-1-ain-412/js-fol-parser';

export const predicatesSlice = createSlice({
  name: 'predicates',
  initialState: {
    currentValue: '',
    lastValidValue: '',
    errMessgage: ''
  },
  reducers: {
    update: (state, action) => {
      state.currentValue = action.payload;
      let predicates = null;
      try {
        predicates = parsePredicates(state.currentValue);
      } catch (err) {
        state.errMessgage = err.message;
      }
      if (predicates != null) {
        state.lastValidValue = state.currentValue;
        state.errMessgage = '';
      }
    }
  }
});

export const { update } = predicatesSlice.actions;

export const selectCurrentValue = state => state.predicates.currentValue;
export const selectErrMessage = state => state.predicates.errMessgage;

export default predicatesSlice.reducer;
