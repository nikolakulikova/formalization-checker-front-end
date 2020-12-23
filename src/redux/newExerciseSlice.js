import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  parseConstants,
  parsePredicates,
  parseFunctions,
  parseFormulaWithPrecedence
} from '@fmfi-uk-1-ain-412/js-fol-parser';
import URL from '../serverURL';

export const newExerciseSlice = createSlice({
  name: 'newExercise',
  initialState: {
    constants: '',
    predicates: '',
    functions: '',
    propositions: [{
      proposition: '',
      formalizations: ['']
    }]
  },
  reducers: {
    updateConstants: (state, action) => {
      state.constants = action.payload;
    },
    updatePredicates: (state, action) => {
      state.predicates = action.payload;
    },
    updateFunctions: (state, action) => {
      state.functions = action.payload;
    },
    updateInformalValue: (state, action) => {
      const value = action.payload.value;
      const i = action.payload.i;
      state.propositions[i].proposition = value;
    },
    updateFormalization: (state, action) => {
      const value = action.payload.value;
      const i = action.payload.i;
      const j = action.payload.j;
      state.propositions[i].formalizations[j] = value;
    },
    addNewProposition: (state) => {
      state.propositions.push({
        proposition: '',
        formalizations: ['']
      });
    },
    addNewFormalization: (state, action) => {
      const i = action.payload;
      state.propositions[i].formalizations.push('');
    },
    removeProposition: (state, action) => {
      const i = action.payload;
      state.propositions.splice(i, 1);
    },
    removeFormalization: (state, action) => {
      const i = action.payload.i;
      const j = action.payload.j;
      state.propositions[i].formalizations.splice(j, 1);
    }
  }
});


/* export actions */
export const {
  updateConstants,
  updatePredicates,
  updateFunctions,
  updateInformalValue,
  updateFormalization,
  addNewProposition,
  addNewFormalization,
  removeProposition,
  removeFormalization
} = newExerciseSlice.actions;


/* definition of helper functions used in selectors */

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

function parseLanguageSubset(input, parser) {
  try {
    let result = parser(input);
    return {
      result: result,
      error: null
    };
  } catch (error) {
    return {
      result: [],
      error: error
    };
  }
}

function checkArity(symbol, args, arityMap, {expected}) {
  const a = arityMap.get(symbol);
  if (args.length !== a) {
    expected(`${a} argument${(a === 1 ? '' : 's')} to ${symbol}`);
  }
}

function parseFormalization(input, constants, predicates, functions, parser) {
  const nonLogicalSymbols = new Set([
    ...constants,
    ...predicates.keys(),
    ...functions.keys()
  ]);

  const language = {
    isConstant: (x) => constants.has(x),
    isPredicate: (x) => predicates.has(x),
    isFunction: (x) => functions.has(x),
    isVariable: (x) => !nonLogicalSymbols.has(x)
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
    return null;
  } catch (error) {
    return error;
  }
}


/* selectors */

export const selectConstantsParsed = (state) => {
  let value = state.newExercise.constants;
  let result = parseLanguageSubset(value, parseConstants);
  return {
    value: value,
    error: result.error
  };
};

export const selectPredicatesParsed = (state) => {
  let value = state.newExercise.predicates;
  let result = parseLanguageSubset(value, parsePredicates);
  return {
    value: value,
    error: result.error
  };
};

export const selectFunctionsParsed = (state) => {
  let value = state.newExercise.functions;
  let result = parseLanguageSubset(value, parseFunctions);
  return {
    value: value,
    error: result.error
  };
};

export const selectLanguage = (state) => {
  let constantsParsed = parseLanguageSubset(
    state.newExercise.constants, parseConstants
  );
  let predicatesParsed = parseLanguageSubset(
    state.newExercise.predicates, parsePredicates
  );
  let functionsParsed = parseLanguageSubset(
    state.newExercise.functions, parseFunctions
  );

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

export const selectPropositions = (state) => {
  return state.newExercise.propositions;
};

export const selectFormalizations = (state, i) => {
  return state.newExercise.propositions[i].formalizations;
};

export const selectInformalValue = (state, i) => {
  return state.newExercise.propositions[i].proposition;
};

export const selectFormalization = (state, i, j) => {
  let value = state.newExercise.propositions[i].formalizations[j];
  let language = selectLanguage(state);
  let error = parseFormalization(
    value, language.constants, language.predicates,
    language.functions, parseFormulaWithPrecedence
  );
  return {
    value: value,
    error: error
  };
};

export const selectExercise = (state) => {
  let language = selectLanguage(state);
  if (language.errorMessage) {
    return {
      error: language.errorMessage
    };
  }
  let propositions = state.newExercise.propositions;
  for (let i = 0; i < propositions.length; i++) {
    let formalizations = propositions[i].formalizations;
    for (let j = 0; j < formalizations.length; j++) {
      let result = selectFormalization(state, i, j);
      if (result.error) {
        return {
          error: result.error
        };
      }
    }
  }
  return {
    constants: state.newExercise.constants,
    predicates: state.newExercise.predicates,
    functions: state.newExercise.functions,
    propositions: state.newExercise.propositions
  };
};


/* async actions */

export const addNewExercise = createAsyncThunk(
  'newExercise/addNewExercise',
  async (exercise) => {
    try {
      const response = await fetch(URL + "/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exercise)
      });
      console.log(response);
    } catch (err) {
      console.error(err.stack);
    }
  }
);


export default newExerciseSlice.reducer;
