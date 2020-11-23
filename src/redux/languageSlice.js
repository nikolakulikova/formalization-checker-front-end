import { createSlice } from '@reduxjs/toolkit';
import {
  parseConstants,
  parsePredicates,
  parseFunctions
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
  } catch (error) {
    return {
      result: [],
      error: error
    };
  }
  return {
    result: result,
    error: null
  };
}

function checkForDuplicates(values, name) {
  let found = new Set();
  for (let x of values) {
    if (found.has(x)) {
      return 'Found duplicate symbol: "' + x + '" in ' + name;
    } else {
      found.add(x);
    }
  }

  return null;
}

function checkForClashes(constants, predicates, functions) {
  for (let x of constants) {
    if (predicates.has(x)) {
      return 'Found clash in language definition: "'
        + x + '" in constants and predicates';
    }
    if (functions.has(x)) {
      return 'Found clash in language definition: "'
        + x + '" in constants and functions';
    }
  }

  for (let x of predicates.keys()) {
    if (functions.has(x)) {
      return 'Found clash in language definition: "'
        + x + '" in predicates and functions';
    }
  }

  return null;
}

function arrayToArityMap(symbols) {
  let arityMap = new Map();
  for (let x of symbols) {
    if (!arityMap.has(x.name)) {
      arityMap.set(x.name, x.arity);
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
  return {
    value: value,
    error: result.error
  };
};

export const selectPredicatesParsed = (state) => {
  let value = state.language.predicatesInput;
  let result = parse(value, parsePredicates);
  return {
    value: value,
    error: result.error
  };
};

export const selectFunctionsParsed = (state) => {
  let value = state.language.functionsInput;
  let result = parse(value, parseFunctions);
  return {
    value: value,
    error: result.error
  };
};

export const selectLanguage = (state) => {
  let constantsParsed = parse(state.language.constantsInput, parseConstants);
  let predicatesParsed = parse(state.language.predicatesInput, parsePredicates);
  let functionsParsed = parse(state.language.functionsInput, parseFunctions);

  let constants = new Set(constantsParsed.result);
  let predicates = arrayToArityMap(predicatesParsed.result);
  let functions = arrayToArityMap(functionsParsed.result);

  let containsErrors = constantsParsed.error
    || predicatesParsed.error
    || functionsParsed.error;
  let containsDuplicates = checkForDuplicates(constantsParsed.result, "constants")
    || checkForDuplicates(predicatesParsed.result.map(x => x.name), "predicates")
    || checkForDuplicates(functionsParsed.result.map(x => x.name), "functions");
  
  let errorMessage = null;
  if (containsErrors) {
    errorMessage = "Language definition contains errors";
  } else if (containsDuplicates) {
    errorMessage = containsDuplicates;
  } else {
    errorMessage = checkForClashes(constants, predicates, functions);
  }

  return {
    constants: constants,
    predicates: predicates,
    functions: functions,
    errorMessage: errorMessage
  };
};

export default languageSlice.reducer;
