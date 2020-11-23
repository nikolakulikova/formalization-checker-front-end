import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from './SyntaxError';
import {
  removeFormalization,
  updateFormalization,
  selectFormalization
} from '../redux/propositionsSlice';

function Formalization(props) {
  return (
    <Row>
      <Col>
        <Form.Group
          className="Formalization"
          controlId={"formFormalization" + props.i + "." + props.j}
        >
          <Form.Label className="Label">
            {"Formalization " + (props.i + 1) + "." + (props.j + 1)}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter formalization"
            value={props.value}
            onChange={(e) => props.update(e.target.value, props.i, props.j)}
          />
          <SyntaxError value={props.value} error={props.error} />
          <Button
            className="SmallButton"
            variant="outline-danger"
            size="sm"
            onClick={() => props.remove(props.i, props.j)}
          >
            Remove
          </Button>
        </Form.Group>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state, ownProps) => {
  const data = selectFormalization(state, ownProps.i, ownProps.j);
  return {
    value: data.value,
    error: data.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (i, j) => dispatch(removeFormalization({
      i: i,
      j: j
    })),
    update: (value, i, j) => dispatch(updateFormalization({
      value: value,
      i: i,
      j: j
    }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Formalization);
