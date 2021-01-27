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
    console.log(exercise);
    content = <p>{ exercise_id }</p>;
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
