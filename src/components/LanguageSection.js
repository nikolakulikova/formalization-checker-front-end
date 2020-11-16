import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Constants from './Constants';
import Predicates from './Predicates';
import Functions from './Functions';

function LanguageSection() {
  return (
    <Row>
      <Col>
        <Row>
          <h2>Language</h2>
        </Row>
        <Constants />
        <Predicates />
        <Functions />
      </Col>
    </Row>
  );
}

export default LanguageSection;
