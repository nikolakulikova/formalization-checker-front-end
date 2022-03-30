
export const arrayToArityMap = (symbols) => {
  let arityMap = new Map();
  for (let x of symbols) {
    if (!arityMap.has(x.name)) {
      arityMap.set(x.name, x.arity);
    }
  }
  return arityMap;
}

export const parseLanguageSubset = (input, parser) => {
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

const checkArity = (symbol, args, arityMap, {expected}) => {
  const a = arityMap.get(symbol);
  if (args.length !== a) {
    expected(`${a} argument${(a === 1 ? '' : 's')} to ${symbol}`);
  }
}

export const parseFormalization = (input, constants, predicates, functions, parser) => {
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
      return null;
    },
    predicateAtom: (symbol, args, ee) => {
      checkArity(symbol, args, predicates, ee);
      return null;
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

export function getStringDomainAndPredicates(symbols, constants, language){
  let d = "𝒟 = {";
  let i = "";
  let poc = 0;
  if(symbols === ''){
    return ['',''];
  }
  for (let [key, value] of Object.entries(constants)){
    if(language.includes(key)) {
      i += "𝑖(" + key + ") = " + value + "\n";
    }
    if( value <= poc){
      continue;
    }
    d += value + ", ";
    poc++;
  }
  i += "\n";
  d = d.slice(0, d.length -2 );
  d += "}\n";

  i += stringForPredicateAndFunctions(symbols);
  return [d, i];
}

function stringForPredicateAndFunctions(name){
  let p = "";
  console.log(name);
  for (let [key, value] of Object.entries(name)) {
    p += "𝑖(" + key + ") = " + "{";
    if (value[value.length - 1] === undefined) {
      p += "}\n";
      continue;
    }
    for (let j = 0; j < value.length - 1; j++) {
      if (value[j] === undefined) {
        continue;
      }
      if(value[j].length === 1){
        p += value[j] + ", ";
      }
      else{
        p += "(" + value[j] + "), ";
      }

    }
    if(value[value.length - 1].length === 1){
      p += value[value.length - 1] + "}\n";
    }
    else{
      p += "(" +  value[value.length - 1] + ")}\n";
    }

  }

  return p;
}