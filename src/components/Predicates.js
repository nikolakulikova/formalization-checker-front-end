import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  updatePredicates,
  selectPredicatesParsed
} from '../redux/languageSlice';

function Predicates(props) {
  return (
    <Row className="LanguageSectionField">
      <Col>
        <Form.Group controlId="formPredicates">
          <Form.Label className="Label">
            Predicates:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter predicates"
            value={props.value}
            onChange={(e) => props.update(e.target.value)}
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
  const data = selectPredicatesParsed(state);
  return {
    value: data.value,
    error: data.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (value) => dispatch(updatePredicates(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Predicates);
