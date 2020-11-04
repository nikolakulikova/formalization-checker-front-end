import { createSlice } from '@reduxjs/toolkit';
import { parsePredicates } from '@fmfi-uk-1-ain-412/js-fol-parser';

export const predicatesSlice = createSlice({
  name: 'predicates',
  initialState: {
    currentValue: '',
    lastValidValue: '',
    errMessgage: '',
    predicates: []
  },
  reducers: {
    update: (state, action) => {
      state.currentValue = action.payload;
      let arr = null;
      try {
        arr = parsePredicates(state.currentValue);
      } catch (err) {
        state.errMessgage = err.message;
      }
      if (arr != null) {
        state.lastValidValue = state.currentValue;
        state.errMessgage = '';
        state.predicates = arr.map((x) => ({
          name: x.name,
          arity: x.arity
        }));
      }
    }
  }
});

export const { update } = predicatesSlice.actions;

export const selectCurrentValue = state => state.predicates.currentValue;
export const selectErrMessage = state => state.predicates.errMessgage;
export const selectPredicates = state => state.predicates.predicates;

export default predicatesSlice.reducer;
