class BinaryFormula {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariables() {
    let a = addAll(new Set(), this.lhs.getFreeVariables());
    return addAll(a, this.rhs.getFreeVariables())
  }
}

class QuantifiedFormula {
  constructor(originalSymbol, subf) {
    this.originalSymbol = originalSymbol;
    this.subf = subf;
  }
  getFreeVariables() {
    const res = this.subf.getFreeVariables()
    res.delete(this.originalSymbol);
    return res;
  }
}

class Variable {
  constructor(originalSymbol) {
    this.originalSymbol = originalSymbol;
  }

  getFreeVariables(){
    return new Set([this.originalSymbol]);

  }
}

class Constant {
  constructor(originalSymbol) {
    this.originalSymbol = originalSymbol;
  }

  getFreeVariables(){
    return new Set();
  }
}

class FunctionApplication {
  constructor(originalSymbol, args) {
    this.originalSymbol = originalSymbol;
    this.args = args;
  }
  getFreeVariables(){
    return this.args.reduce(
        (fvs, arg) => addAll(fvs, arg.getFreeVariables()),
        new Set()
    );
  }
}

class PredicateAtom {
  constructor(originalSymbol, args) {
    this.originalSymbol = originalSymbol;
    this.args = args;
  }
  getFreeVariables() {
    return this.args.reduce(
        (fvs, arg) => addAll(fvs, arg.getFreeVariables()),
        new Set()
    );
  }
}

class EqualityAtom extends BinaryFormula{
}

class Negation {
  constructor(subf) {
    this.subf = subf;
  }

  getFreeVariables(){
    return this.subf.getFreeVariables();
  }
}

class Conjunction extends BinaryFormula{
}

class Disjunction extends BinaryFormula{
}

class Implication extends BinaryFormula{
}

class Equivalence extends BinaryFormula{
}

class ExistentialQuant extends QuantifiedFormula{
}

class UniversalQuant extends QuantifiedFormula{
}

function addAll(a, b) {
  b.forEach((elem) => a.add(elem));
  return a;
}

module.exports = {
    Variable,
    Constant,
    FunctionApplication,
    PredicateAtom,
    EqualityAtom,
    Negation,
    Conjunction,
    Disjunction,
    Implication,
    Equivalence,
    ExistentialQuant,
    UniversalQuant
};
