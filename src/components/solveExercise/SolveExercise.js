import React from 'react';
import { connect } from 'react-redux';
import {
  selectExerciseID
} from '../../redux/solveExerciseSlice';
import ExerciseList from './ExerciseList';
import ExerciseForm from './ExerciseForm';

function SolveExercise({ exercise_id }) {
  if (exercise_id) {
    return <ExerciseForm exercise_id={exercise_id} />;
  } else {
    return <ExerciseList />;
  }
}

const mapStateToProps = (state) => {
  return {
    exercise_id: selectExerciseID(state)
  };
};

export default connect(mapStateToProps)(SolveExercise);
