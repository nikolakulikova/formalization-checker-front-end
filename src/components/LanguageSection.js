import React from 'react';
import Constants from './Constants';
import Predicates from './Predicates';
import Functions from './Functions';
import Clashes from './Clashes';

function LanguageSection() {
  return (
    <div className="mt-3 mb-4">
      <h2>Language</h2>
      <Constants />
      <Predicates />
      <Functions />
      <Clashes />
    </div>
  );
}

export default LanguageSection;
