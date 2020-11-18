import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Constants from './Constants';
import Predicates from './Predicates';
import Functions from './Functions';
import Clashes from './Clashes';

function LanguageSection() {
  return (
    <Row className="AppSection">
      <Col>
        <Row>
          <h2>Language</h2>
        </Row>
        <Constants />
        <Predicates />
        <Functions />
        <Clashes />
      </Col>
    </Row>
  );
}

export default LanguageSection;
