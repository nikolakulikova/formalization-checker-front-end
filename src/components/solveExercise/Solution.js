import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from '../addExercise/SyntaxError';
import {
  update,
  selectFormalization
} from '../../redux/solveExerciseSlice';

function Solution({ id, proposition, value, error, update }) {
  return (
    <Form.Group>
      <Form.Label>
        { proposition }
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter formalization"
        value={value}
        onChange={(e) => update(e.target.value, id)}
      />
      <SyntaxError value={value} error={error} />
    </Form.Group>
  );
}

const mapStateToProps = (state, ownProps) => {
  const data = selectFormalization(state, ownProps.id);
  return {
    value: data.value,
    error: data.error
  };
};

const mapDispatchToProps = { update: update };

export default connect(mapStateToProps, mapDispatchToProps)(Solution);
