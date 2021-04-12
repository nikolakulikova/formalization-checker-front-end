import React, { useEffect } from 'react';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchAllExercises,
  selectExercises,
  selectStatus,
  selectError
} from '../../redux/exercisesSlice';

function ExerciseList({ exercises, status, error, fetchAllExercises }) {
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
      <Link to={`/solve/${x.exercise_id}`} key={x.exercise_id}>
        <ListGroup.Item action variant="primary">
          { x.title }
        </ListGroup.Item>
      </Link>
    ));
    content = <ListGroup>{ exercises_list }</ListGroup>;
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger">
        { error }
      </Alert>
    );
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
    exercises: selectExercises(state),
    status: selectStatus(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = { fetchAllExercises };

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
