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
  for (let x of values) {
    if (found.has(x)) {
      return 'Found duplicate symbol: "' + x + '"';
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
  let constantsParsed = parse(state.language.constantsInput, parseConstants);
  let predicatesParsed = parse(state.language.predicatesInput, parsePredicates);
  let functionsParsed = parse(state.language.functionsInput, parseFunctions);

  let constants = new Set(constantsParsed.result);
  let predicates = arrayToArityMap(predicatesParsed.result);
  let functions = arrayToArityMap(functionsParsed.result);

  let containsErrors = constantsParsed.error
    || predicatesParsed.error
    || functionsParsed.error;
  let containsDuplicates = checkForDuplicates(constantsParsed.result)
    || checkForDuplicates(predicatesParsed.result.map(x => x.name))
    || checkForDuplicates(functionsParsed.result.map(x => x.name));
  
  let error = null;
  if (containsErrors || containsDuplicates) {
    error = "Language definition contains errors";
  } else {
    error = checkForClashes(constants, predicates, functions);
  }

  return {
    constants: constants,
    predicates: predicates,
    functions: functions,
    error: error
  };
};

export default languageSlice.reducer;
