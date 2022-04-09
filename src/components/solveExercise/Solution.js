import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from '../addExercise/SyntaxError';
import Evaluation from './Evaluation';
import {
  update,
  evaluate,
 updateHelper,
  selectSolution
} from '../../redux/solveExerciseSlice';


function Solution({ exercise_id, proposition_id, proposition,
                    value, value2, error,error2, update , updateHelper,  evaluate, user}) {
  return (
    <div className="clearfix mt-4">
      <Form.Group className="clearfix">
        <Form.Label>
          { proposition }
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter formalization"
          value={value}
          onChange={(e) => update(e.target.value, proposition_id)}
        />
       <Form.Control
          type="text"
          placeholder="Enter another one"
          value={value2}
          onChange={(e) => updateHelper(e.target.value, proposition_id)}
        />
        <Button
          className="mt-1 float-right"
          variant="primary"
          disabled={error}
          onClick={() => evaluate({
            exercise_id,
            proposition_id,
            solution: value,
            helpSolution: value2,
            user: user
          })}
        >
          Check
        </Button>
        <SyntaxError value={value} error={error} />
        <SyntaxError value={value2} error={error2} />
      </Form.Group>
      <Evaluation proposition_id={proposition_id} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return selectSolution(state, ownProps.proposition_id);
};

const mapDispatchToProps = { update, evaluate, updateHelper };

export default connect(mapStateToProps, mapDispatchToProps)(Solution);
