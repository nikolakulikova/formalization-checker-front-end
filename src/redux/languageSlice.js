import { createSlice } from '@reduxjs/toolkit';
import {
  parseConstants,
  parsePredicates,
  parseFunctions,
} from '@fmfi-uk-1-ain-412/js-fol-parser';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    constantsInput: '',
    predicatesInput: '',
    functionsInput: ''
  },
  reducers: {
    updateConstants: (state, action) => {
      state.constantsInput = action.payload;
    },
    updatePredicates: (state, action) => {
      state.predicatesInput = action.payload;
    },
    updateFunctions: (state, action) => {
      state.functionsInput = action.payload;
    }
  }
});


function parse(input, parser) {
  let result;
  try {
    result = parser(input);
  } catch (err) {
    return {
      result: [],
      error: err.message
    };
  }
  return {
    result: result,
    error: null
  };
}

function checkForDuplicates(values) {
  let found = new Set();
  for (let i = 0; i < values.length; i++) {
    if (found.has(values[i])) {
      return 'Found duplicate symbol: "' + values[i] + '"';
    } else {
      found.add(values[i]);
    }
  }
  return null;
}

function arrayToArityMap(symbols) {
  let arityMap = new Map();
  for (let i = 0; i < symbols.length; i++) {
    if (!arityMap.has(symbols[i].name)) {
      arityMap.set(symbols[i].name, symbols[i].arity);
    }
  }
  return arityMap;
}


export const {
  updateConstants,
  updatePredicates,
  updateFunctions
} = languageSlice.actions;

export const selectConstantsParsed = (state) => {
  let value = state.language.constantsInput;
  let result = parse(value, parseConstants);
  let error = result.error
    ? result.error
    : checkForDuplicates(result.result);
  return {
    value: value,
    error: error
  };
};

export const selectPredicatesParsed = (state) => {
  let value = state.language.predicatesInput;
  let result = parse(value, parsePredicates);
  let error = result.error
    ? result.error
    : checkForDuplicates(result.result.map(x => x.name));
  return {
    value: value,
    error: error
  };
};

export const selectFunctionsParsed = (state) => {
  let value = state.language.functionsInput;
  let result = parse(value, parseFunctions);
  let error = result.error
    ? result.error
    : checkForDuplicates(result.result.map(x => x.name));
  return {
    value: value,
    error: error
  };
};

export const selectLanguage = (state) => {
  let constants = parse(state.language.constantsInput, parseConstants);
  let predicates = parse(state.language.predicatesInput, parsePredicates);
  let functions = parse(state.language.functionsInput, parseFunctions);

  let containsErrors = constants.error || predicates.error || functions.error;
  let containsDuplicates = checkForDuplicates(constants.result)
    || checkForDuplicates(predicates.result.map(x => x.name))
    || checkForDuplicates(functions.result.map(x => x.name));
  
  let error = containsErrors || containsDuplicates
    ? 'Language definition contains errors'
    : null;
  return {
    constants: new Set(constants.result),
    predicates: arrayToArityMap(predicates.result),
    functions: arrayToArityMap(functions.result),
    error: error
  };
};

export default languageSlice.reducer;
