
class Variable {
  constructor(originalSymbol) {
    this.originalSymbol = originalSymbol;
  }

  getFreeVariable(used){
    return !(used.includes(this.originalSymbol ));

  }
}

class Constant {
  constructor(originalSymbol) {
    this.originalSymbol = originalSymbol;
  }

  getFreeVariable(used){
    return false;
  }
}

class FunctionApplication {
  constructor(originalSymbol, args) {
    this.originalSymbol = originalSymbol;
    this.args = args;
  }
  getFreeVariable(used){
    for(let i = 0; i < this.args.length; i++){
      if(this.args[i].getFreeVariable(used)){
        return true;
      }
    }
    return false;
  }
}

class PredicateAtom {
  constructor(originalSymbol, args) {
    this.originalSymbol = originalSymbol;
    this.args = args;
  }
  getFreeVariable(used) {
    console.log("preedikat");
    for (let i = 0; i < this.args.length; i++) {
      console.log(this.args[i]);
      if(this.args[i].getFreeVariable(used)){
        return true;
      }
    }
    return false;
  }
}

class EqualityAtom {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
  getFreeVariable(used) {
    let pom = this.lhs.getFreeVariable(used);
    if (pom) {
      return pom;
    }
    return this.rhs.getFreeVariable(used);
  }


}

class Negation {
  constructor(subf) {
    this.subf = subf;
  }

  getFreeVariable(used){
    return this.subf.getFreeVariable(used);
  }
}

class Conjunction {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariable(used) {
    let pom = this.lhs.getFreeVariable(used);
    if (pom) {
      return pom;
    }
    return this.rhs.getFreeVariable(used);
  }

}

class Disjunction {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariable(used) {
    let pom = this.lhs.getFreeVariable(used);
    if (pom) {
      return pom;
    }
    return this.rhs.getFreeVariable(used);
  }
}

class Implication {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariable(used) {
    let pom = this.lhs.getFreeVariable(used);
    if (pom) {
      return pom;
    }
    return this.rhs.getFreeVariable(used);
  }

}

class Equivalence {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  getFreeVariable(used) {
    let pom = this.lhs.getFreeVariable(used);
    if (pom) {
      return pom;
    }
   return this.rhs.getFreeVariable(used);
  }
}

class ExistentialQuant {
  constructor(originalSymbol, subf) {
    this.originalSymbol = originalSymbol;
    this.subf = subf;
  }
  getFreeVariable(used) {
    let newArray = [];
    for(let i = 0; i < used.length; i++){
      newArray.push(used[i]);
    }
    newArray.push(this.originalSymbol);
    return this.subf.getFreeVariable(newArray);
  }


}

class UniversalQuant {
  constructor(originalSymbol, subf) {
    this.originalSymbol = originalSymbol;
    this.subf = subf;
  }
  getFreeVariable(used) {
    let newArray = [];
    for(let i = 0; i < used.length; i++){
      newArray.push(used[i]);
    }
    newArray.push(this.originalSymbol);
    return this.subf.getFreeVariable(newArray);
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
