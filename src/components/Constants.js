import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from './SyntaxError';
import {
  updateConstants,
  selectConstantsParsed
} from '../redux/newExerciseSlice';

function Constants(props) {  
  return (
    <Row className="LanguageSectionField">
      <Col>
        <Form.Group controlId="formConstants">
          <Form.Label className="Label">
            Constants:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter constants"
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
  const data = selectConstantsParsed(state);
  return {
    value: data.value,
    error: data.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (value) => dispatch(updateConstants(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Constants);
