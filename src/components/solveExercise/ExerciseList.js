import React, { useEffect } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  selectAllExercises,
  selectStatus,
  selectError,
  fetchAllExercises,
  chooseExercise
} from '../../redux/solveExerciseSlice';

function ExerciseList({ exercises, status, error, fetchAllExercises, chooseExercise }) {
  useEffect(() => {
    if (status === 'idle') {
      fetchAllExercises();
    }
  }, [status, fetchAllExercises]);

  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    let exercises_list = exercises.map((x) => (
      <ListGroup.Item key={x.exercise_id}
        action variant="primary" className="mt-1 mb-1"
        onClick={() => chooseExercise(x.exercise_id)}
      >
        {x.title}
      </ListGroup.Item>
    ));
    content = <ListGroup>{ exercises_list }</ListGroup>;
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <div>
      <h2 className="mb-4">Exercises:</h2>
      { content }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    exercises: selectAllExercises(state),
    status: selectStatus(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = { fetchAllExercises, chooseExercise };

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
