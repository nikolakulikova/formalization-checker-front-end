
class Variable {
  constructor(originalSymbol) {
    this.originalSymbol = originalSymbol;
  }

  getFreeVariable(){
    let res = new Set();
    res.add(this.originalSymbol);
    return  res;

  }
}

class Constant {
  constructor(originalSymbol) {
    this.originalSymbol = originalSymbol;
  }

  getFreeVariable(){
    return new Set();
  }
}

class FunctionApplication {
  constructor(originalSymbol, args) {
    this.originalSymbol = originalSymbol;
    this.args = args;
  }
  getFreeVariable(){
    let res = new Set();
    for(let i = 0; i < this.args.length; i++){
      for(let element of this.args[i].getFreeVariable()){
        res.add(element);
      }
    }
    return res;
  }
}

class PredicateAtom {
  constructor(originalSymbol, args) {
    this.originalSymbol = originalSymbol;
    this.args = args;
  }
  getFreeVariable() {
    let res = new Set();
    for (let i = 0; i < this.args.length; i++) {
      for(let element of this.args[i].getFreeVariable()){
        res.add(element);
      }
    }
    return res;
  }
}

class EqualityAtom {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
  getFreeVariable() {
    let res = new Set();
    for(let element of this.lhs.getFreeVariable()){
      res.add(element);
    }
    for(let element of this.rhs.getFreeVariable()){
      res.add(element);
    }
    return res;
  }


}

class Negation {
  constructor(subf) {
    this.subf = subf;
  }

  getFreeVariable(){
    return this.subf.getFreeVariable();
  }
}

class Conjunction {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariable() {
    let res = new Set();
    for(let element of this.lhs.getFreeVariable()){
      res.add(element);
    }
    for(let element of this.rhs.getFreeVariable()){
      res.add(element);
    }
    return res;
  }

}

class Disjunction {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariable() {
    let res = new Set();
    for(let element of this.lhs.getFreeVariable()){
      res.add(element);
    }
    for(let element of this.rhs.getFreeVariable()){
      res.add(element);
    }
    return res;
  }
}

class Implication {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariable() {
    let res = new Set();
    for(let element of this.lhs.getFreeVariable()){
      res.add(element);
    }
    for(let element of this.rhs.getFreeVariable()){
      res.add(element);
    }
    return res;
  }

}

class Equivalence {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariable() {
    let res = new Set();
    for(let element of this.lhs.getFreeVariable()){
      res.add(element);
    }
    for(let element of this.rhs.getFreeVariable()){
      res.add(element);
    }
    return res;
  }
}

class ExistentialQuant {
  constructor(originalSymbol, subf) {
    this.originalSymbol = originalSymbol;
    this.subf = subf;
  }
  getFreeVariable() {
    let res = this.subf.getFreeVariable()
    res.delete(this.originalSymbol);
    return res;
  }


}

class UniversalQuant {
  constructor(originalSymbol, subf) {
    this.originalSymbol = originalSymbol;
    this.subf = subf;
  }
  getFreeVariable() {
    let res = this.subf.getFreeVariable()
    res.delete(this.originalSymbol);
    return res;
  }

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
