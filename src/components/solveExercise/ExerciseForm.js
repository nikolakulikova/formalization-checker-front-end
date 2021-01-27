import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  selectExercise,
  selectStatus,
  selectError,
  fetchExercise
} from '../../redux/solveExerciseSlice';

function ExerciseForm({ exercise_id, exercise, status, error, fetchExercise }) {
  useEffect(() => {
    if (status === 'idle') {
      fetchExercise(exercise_id);
    }
  }, [status, exercise_id, fetchExercise]);

  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    const propositions_list = exercise.propositions.map((x) => (
      <p key={x.proposition_id}>{ x.proposition }</p>
    ));
    content = (
      <div>
        <h2>{ exercise.title }</h2>
        <p>{ exercise.constants }</p>
        <p>{ exercise.predicates }</p>
        <p>{ exercise.functions }</p>
        <p>{ exercise.constants }</p>
        { propositions_list }
      </div>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <div>
      { content }
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

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm);
