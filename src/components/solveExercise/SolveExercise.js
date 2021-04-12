import React, { useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Solution from './Solution';
import {
  selectExercise,
  selectStatus,
  selectError,
  fetchExercise
} from '../../redux/solveExerciseSlice';

function SolveExercise({ match, exercise, status, error, fetchExercise }) {
  let { id } = match.params;

  useEffect(() => {
    if (status === 'idle' || (exercise && exercise.exercise_id !== parseInt(id))) {
      fetchExercise(id);
    }
  }, [status, id, exercise, fetchExercise]);

  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    const propositions_list = exercise.propositions.map((x) => (
      <Solution
        key={x.proposition_id}
        exercise_id={id}
        proposition_id={x.proposition_id}
        proposition={x.proposition}
      />
    ));
    content = (
      <div>
        <h2>{ exercise.title }</h2>
        <h5>Constants</h5>
        <p>{ exercise.constants }</p>
        <h5>Predicates</h5>
        <p>{ exercise.predicates }</p>
        <h5>Functions</h5>
        <p>{ exercise.functions }</p>
        { propositions_list }
      </div>
    );
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  return content;
}

const mapStateToProps = (state) => {
  return {
    exercise: selectExercise(state),
    status: selectStatus(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = { fetchExercise };

export default connect(mapStateToProps, mapDispatchToProps)(SolveExercise);
