import { createSlice } from '@reduxjs/toolkit';
import { parseFormula } from '@fmfi-uk-1-ain-412/js-fol-parser';

function parse(input, constants, predicates, functions) {
  const constantNames = constants;
  const predicateNames = predicates.map((x) => x.name);
  const functionNames = functions.map((x) => x.name);

  const nonLogicalSymbols = new Set([
    ...constantNames,
    ...predicateNames,
    ...functionNames
  ]);

  const language = {
    isConstant: (x) => constantNames.has(x),
    isFunction: (x) => functionNames.has(x),
    isPredicate: (x) => predicateNames.has(x),
    isVariable: (x) => !nonLogicalSymbols.has(x)
  };

  const factories = {
    variable: () => null,
    constant: () => null,
    functionApplication: () => null,
    predicateAtom: () => null,
    equalityAtom: () => null,
    negation: () => null,
    conjunction: () => null,
    disjunction: () => null,
    implication: () => null,
    equivalence: () => null,
    existentialQuant: () => null,
    universalQuant: () => null
  };

  parseFormula(input, language, factories);

  return true;
}

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
      state.formulas[formulaNum].formalizations[formalizationNum].currentValue = value;

      /*let parsed = false;
      try {
        parsed = parse(value, selectConstants, selectPredicates, []);
      } catch (err) {
        state.formulas[formulaNum].formalizations[formalizationNum].errMessage = err.message;
      }
      if (parsed) {
        state.formulas[formulaNum].formalizations[formalizationNum].lastValidValue = value;
        state.formulas[formulaNum].formalizations[formalizationNum].errMessage = '';
      }*/
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
