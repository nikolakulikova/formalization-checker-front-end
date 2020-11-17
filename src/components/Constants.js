import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  updateConstants,
  selectConstantsParsed
} from '../redux/languageSlice';

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
  const data = selectConstantsParsed(state);
  return {
    value: data.value,
    error: data.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: value => dispatch(updateConstants(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Constants);
