import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  updateFunctions,
  selectFunctionsParsed
} from '../redux/languageSlice';

function Functions(props) {
  return (
    <Row>
      <Col>
        <Form.Group controlId="formFunctions">
          <Form.Label className="Label">
            Functions:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter functions"
            value={props.value}
            onChange={e => props.update(e.target.value)}
          />
          <Form.Text className="Error">
            {props.error}
          </Form.Text>
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
    update: value => dispatch(updateFunctions(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Functions);
