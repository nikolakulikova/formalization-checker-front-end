import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewExercise, selectExercise } from '../../redux/addExerciseSlice';
import LanguageSection from './LanguageSection';
import PropositionsSection from './PropositionsSection';
import ExerciseTitle from './ExerciseTitle';
import Description from './Description';

function AddExercise({ exercise, containsErrors, addExercise }) {
  return (
    <Form>
      <h2>New exercise</h2>
      <ExerciseTitle />
      <Description />
      <LanguageSection />
      <PropositionsSection />
      <Button
        className="mt-4 mb-5 float-right clearfix"
        variant="primary"
        size="lg"
        disabled={containsErrors}
        onClick={() => addExercise(exercise)}
      >
        Save exercise
      </Button>
    </Form>
  );
}

const mapStateToProps = (state) => {
  let exercise = selectExercise(state);
  console.log(exercise);
  if (exercise.containsErrors) {
    return {
      exercise: null,
      containsErrors: true
    };
  }
  return {
    exercise: exercise,
    containsErrors: false
  };
};

const mapDispatchToProps = { addExercise: addNewExercise };

export default connect(mapStateToProps, mapDispatchToProps)(AddExercise);
