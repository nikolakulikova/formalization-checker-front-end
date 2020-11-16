import { createSlice } from '@reduxjs/toolkit';
import { parseFormulaWithPrecedence } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { selectLanguage } from './languageSlice';

export const propositionsSlice = createSlice({
  name: 'propositions',
  initialState: {
    propositionsInput: [{
      informalValue: '',
      formalizations: ['']
    }]
  },
  reducers: {
    updateInformalValue: (state, action) => {
      const value = action.payload.value;
      const i = action.payload.i;
      state.propositionsInput[i].informalValue = value;
    },
    updateFormalization: (state, action) => {
      const value = action.payload.value;
      const i = action.payload.i;
      const j = action.payload.j;
      state.propositionsInput[i].formalizations[j] = value;
    },
    addNewProposition: (state, action) => {
      state.propositionsInput.push({
        informalValue: '',
        formalizations: ['']
      });
    },
    addNewFormalization: (state, action) => {
      const i = action.payload;
      state.propositionsInput[i].formalizations.push('');
    },
    removeProposition: (state, action) => {
      const i = action.payload;
      state.propositionsInput.splice(i, 1);
    },
    removeFormalization: (state, action) => {
      const i = action.payload.i;
      const j = action.payload.j;
      state.propositionsInput[i].formalizations.splice(j, 1);
    }
  }
});


function checkArity(symbol, args, arityMap, {expected}) {
  const a = arityMap.get(symbol);
  if (args.length !== a) {
    expected(`${a} argument${(a === 1 ? '' : 's')} to ${symbol}`);
  }
}

function parse(input, constants, predicates, functions, parser) {
  const nonLogicalSymbols = new Set([
    ...constants,
    ...predicates.keys(),
    ...functions.keys()
  ]);

  const language = {
    isConstant: x => constants.has(x),
    isPredicate: x => predicates.has(x),
    isFunction: x => functions.has(x),
    isVariable: x => !nonLogicalSymbols.has(x)
  };

  const factories = {
    variable: () => null,
    constant: () => null,
    functionApplication: (symbol, args, ee) => {
      checkArity(symbol, args, functions, ee);
    },
    predicateAtom: (symbol, args, ee) => {
      checkArity(symbol, args, predicates, ee);
    },
    equalityAtom: () => null,
    negation: () => null,
    conjunction: () => null,
    disjunction: () => null,
    implication: () => null,
    equivalence: () => null,
    existentialQuant: () => null,
    universalQuant: () => null
  };

  try {
    parser(input, language, factories);
  } catch (err) {
    return err.message;
  }

  return null;
}


export const {
  updateInformalValue,
  updateFormalization,
  addNewProposition,
  addNewFormalization,
  removeProposition,
  removeFormalization
} = propositionsSlice.actions;

export const selectPropositions = (state) => {
  return state.propositions.propositionsInput;
};

export const selectFormalizations = (state, i) => {
  return state.propositions.propositionsInput[i].formalizations;
};

export const selectInformalValue = (state, i) => {
  return state.propositions.propositionsInput[i].informalValue;
};

export const selectFormalization = (state, i, j) => {
  let value = state.propositions.propositionsInput[i].formalizations[j];
  let language = selectLanguage(state);
  if (language.error) {
    return {
      value: value,
      error: language.error
    };
  }
  let error = parse(value, language.constants, language.predicates,
    language.functions, parseFormulaWithPrecedence);
  return {
    value: value,
    error: error
  };
};

export default propositionsSlice.reducer;
