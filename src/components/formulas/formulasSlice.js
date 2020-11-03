import { createSlice } from '@reduxjs/toolkit';

export const formulasSlice = createSlice({
  name: 'formulas',
  initialState: {
    formulas: [{
      informalValue: '',
      formalizations: [{
        currentValue: '',
        lastValidValue: '',
        errorStr: ''
      }]
    }]
  },
  reducers: {
    updateInformalValue: (state, action) => {
      const value = action.payload.value;
      const formulaNum = action.payload.formulaNum;
      state.formulas[formulaNum].informalValue = value;
    },
    updateFormalization: (state, action) => {
      const value = action.payload.value;
      const formulaNum = action.payload.formulaNum;
      const formalizationNum = action.payload.formalizationNum;
      state.formulas[formulaNum]
        .formalizations[formalizationNum].currentValue = value;
    },
    addNewFormula: (state, action) => {
      state.formulas.push({
        informalValue: '',
        formalizations:[{
          currentValue: '',
          lastValidValue: '',
          errorStr: ''
        }]
      });
    },
    addNewFormalization: (state, action) => {
      const formulaNum = action.payload;
      state.formulas[formulaNum].formalizations.push({
        currentValue: '',
        lastValidValue: '',
        errorStr: ''
      });
    }
  }
});

export const {
  updateInformalValue,
  updateFormalization,
  addNewFormula,
  addNewFormalization
} = formulasSlice.actions;

export const selectValues = state => state.formulas.formulas;

export default formulasSlice.reducer;
