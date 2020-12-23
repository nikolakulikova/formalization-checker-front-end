import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from './SyntaxError';
import {
  updateFunctions,
  selectFunctionsParsed
} from '../redux/newExerciseSlice';

function Functions(props) {
  return (
    <Row className="LanguageSectionField">
      <Col>
        <Form.Group controlId="formFunctions">
          <Form.Label className="Label">
            Functions:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter functions"
            value={props.value}
            onChange={(e) => props.update(e.target.value)}
          />
          <SyntaxError value={props.value} error={props.error} />
        </Form.Group>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  const data = selectFunctionsParsed(state);
  return {
    value: data.value,
    error: data.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (value) => dispatch(updateFunctions(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Functions);
