import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewExercise, selectExercise } from '../redux/newExerciseSlice';
import LanguageSection from './LanguageSection';
import PropositionsSection from './PropositionsSection';
import ExerciseTitle from './ExerciseTitle';

function AddExercise({ exercise, containsErrors, addExercise }) {
  return (
    <Container>
      <Form className="mt-3">
        <h2>New exercise</h2>
        <ExerciseTitle />
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
    </Container>
  );
}

const mapStateToProps = (state) => {
  let exercise = selectExercise(state);
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
