import { createSlice } from '@reduxjs/toolkit';

export const formulasSlice = createSlice({
  name: 'formulas',
  initialState: {
    formulas: [{
      informalValue: '',
      formalizations: [{
        currentValue: '',
        lastValidValue: '',
        errMessage: ''
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
          errMessage: ''
        }]
      });
    },
    addNewFormalization: (state, action) => {
      const formulaNum = action.payload;
      state.formulas[formulaNum].formalizations.push({
        currentValue: '',
        lastValidValue: '',
        errMessage: ''
      });
    },
    removeFormula: (state, action) => {
      state.formulas.splice(action.payload, 1);
    },
    removeFormalization: (state, action) => {
      const formulaNum = action.payload.formulaNum;
      const formalizationNum = action.payload.formalizationNum;
      state.formulas[formulaNum].formalizations.splice(formalizationNum, 1);
    }
  }
});

export const {
  updateInformalValue,
  updateFormalization,
  addNewFormula,
  addNewFormalization,
  removeFormula,
  removeFormalization
} = formulasSlice.actions;

export const selectValues = state => state.formulas.formulas;

export default formulasSlice.reducer;
