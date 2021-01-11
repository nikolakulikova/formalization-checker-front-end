import {
  createSlice,
  createSelector,
  createAsyncThunk
} from '@reduxjs/toolkit';
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
    title: '',
    constants: '',
    predicates: '',
    functions: '',
    propositions: [{
      proposition: '',
      formalizations: ['']
    }]
  },
  reducers: {
    updateExerciseTitle: (state, action) => {
      state.title = action.payload;
    },
    updateConstants: (state, action) => {
      state.constants = action.payload;
    },
    updatePredicates: (state, action) => {
      state.predicates = action.payload;
    },
    updateFunctions: (state, action) => {
      state.functions = action.payload;
    },
    updateInformalValue: {
      reducer: (state, action) => {
        const { value, i } = action.payload;
        state.propositions[i].proposition = value;
      },
      prepare: (value, i) => {
        return { payload: { value, i } };
      }
    },
    updateFormalization: {
      reducer: (state, action) => {
        const { value, i, j } = action.payload;
        state.propositions[i].formalizations[j] = value;
      },
      prepare: (value, i, j) => {
        return { payload: { value, i, j } };
      }
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
    removeFormalization: {
      reducer: (state, action) => {
        const { i, j } = action.payload;
        state.propositions[i].formalizations.splice(j, 1);
      },
      prepare: (i, j) => {
        return { payload: { i, j } };
      }
    }
  }
});


/* export actions */
export const {
  updateExerciseTitle,
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
      return `Found duplicate symbol: '${x}' in ${name}`;
    } else {
      found.add(x);
    }
  }

  return null;
}

function checkForClashes(constants, predicates, functions) {
  for (let x of constants) {
    if (predicates.has(x)) {
      return `Found clash in language definition: '${x}' in constants and predicates`;
    }
    if (functions.has(x)) {
      return `Found clash in language definition: '${x}' in constants and functions`;
    }
  }

  for (let x of predicates.keys()) {
    if (functions.has(x)) {
      return `Found clash in language definition: '${x}' in predicates and functions`;
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
      array: result,
      error: null
    };
  } catch (error) {
    return {
      array: [],
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

export const selectExerciseTitle = (state) => {
  return {
    value: state.newExercise.title
  };
};

export const selectConstantsParsed = createSelector(
  [ state => state.newExercise.constants ],
  (value) => {
    let result = parseLanguageSubset(value, parseConstants);
    return {
      value: value,
      array: result.array,
      error: result.error
    };
  }
);

export const selectPredicatesParsed = createSelector(
  [ state => state.newExercise.predicates ],
  (value) => {
    let result = parseLanguageSubset(value, parsePredicates);
    return {
      value: value,
      array: result.array,
      error: result.error
    };
  }
);

export const selectFunctionsParsed = createSelector(
  [ state => state.newExercise.functions ],
  (value) => {
    let result = parseLanguageSubset(value, parseFunctions);
    return {
      value: value,
      array: result.array,
      error: result.error
    };
  }
);

export const selectLanguage = createSelector(
  [
    selectConstantsParsed,
    selectPredicatesParsed,
    selectFunctionsParsed
  ],
  (constantsParsed, predicatesParsed, functionsParsed) => {
    let constants = new Set(constantsParsed.array);
    let predicates = arrayToArityMap(predicatesParsed.array);
    let functions = arrayToArityMap(functionsParsed.array);

    let containsErrors = constantsParsed.error
      || predicatesParsed.error
      || functionsParsed.error;
    let containsDuplicates = checkForDuplicates(constantsParsed.array, "constants")
      || checkForDuplicates(predicatesParsed.array.map(x => x.name), "predicates")
      || checkForDuplicates(functionsParsed.array.map(x => x.name), "functions");
    
    let errorMessage = null;
    if (containsErrors) {
      errorMessage = "Language definition contains errors";
    } else if (containsDuplicates) {
      errorMessage = containsDuplicates;
    } else {
      errorMessage = checkForClashes(constants, predicates, functions);
    }

    return { constants, predicates, functions, errorMessage };
  }
);

export const selectPropositions = (state) => {
  return state.newExercise.propositions;
};

export const selectFormalizations = (state, i) => {
  return state.newExercise.propositions[i].formalizations;
};

export const selectInformalValue = (state, i) => {
  return state.newExercise.propositions[i].proposition;
};

export const selectFormalization = createSelector(
  [
    (state, i, j) => state.newExercise.propositions[i].formalizations[j],
    (state, i, j) => selectLanguage(state)
  ],
  (value, language) => {
    let error = parseFormalization(
      value, language.constants, language.predicates,
      language.functions, parseFormulaWithPrecedence
    );
    return { value, error };
  }
);

export const selectExercise = (state) => {
  if (state.newExercise.title === "") {
    return {
      containsErrors: true
    };
  }

  let language = selectLanguage(state);
  if (language.errorMessage) {
    return {
      containsErrors: true
    };
  }

  let propositions = selectPropositions(state);
  for (let i = 0; i < propositions.length; i++) {
    let formalizations = propositions[i].formalizations;
    for (let j = 0; j < formalizations.length; j++) {
      let formalization = selectFormalization(state, i, j);
      if (formalization.error) {
        return {
          containsErrors: true
        };
      }
    }
  }
  
  return {
    title: state.newExercise.title,
    constants: state.newExercise.constants,
    predicates: state.newExercise.predicates,
    functions: state.newExercise.functions,
    propositions: state.newExercise.propositions,
    containsErrors: false
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
