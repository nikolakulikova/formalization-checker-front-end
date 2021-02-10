import React, { useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Solution from './Solution';
import {
  selectExercise,
  selectStatus,
  selectError,
  fetchExercise
} from '../../redux/solveExerciseSlice';

function SolveExercise({ match, exercise, status, error, fetchExercise }) {
  const { id } = match.params;

  useEffect(() => {
    if (status === 'idle') {
      fetchExercise(id);
    }
  }, [status, id, fetchExercise]);

  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    const propositions_list = exercise.propositions.map((x) => (
      <Solution
        key={x.proposition_id}
        id={x.proposition_id}
        proposition={x.proposition}
      />
    ));
    content = (
      <div>
        <h2>{ exercise.title }</h2>
        <h6>Constants</h6>
        <p>{ exercise.constants }</p>
        <h6>Predicates</h6>
        <p>{ exercise.predicates }</p>
        <h6>Functions</h6>
        <p>{ exercise.functions }</p>
        { propositions_list }
      </div>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <div>
      { content }
      <Button
        className="mt-1 float-right"
        variant="primary"
        size="lg"
        onClick={() => {}}
      >
        Check
      </Button>
    </div>
  );
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
