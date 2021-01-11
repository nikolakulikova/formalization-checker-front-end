import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewExercise, selectExercise } from '../redux/newExerciseSlice';
import LanguageSection from './LanguageSection';
import PropositionsSection from './PropositionsSection';

function AddExercise({ exercise, exerciseError, addExercise }) {
  return (
    <Container>
      <Form>
        <LanguageSection />
        <PropositionsSection />
        <Button
          className="mt-4 mb-5 float-right clearfix"
          variant="primary"
          size="lg"
          disabled={exerciseError}
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
  if (exercise.error) {
    return {
      exericse: null,
      exerciseError: exercise.error
    };
  }
  return {
    exercise: exercise,
    exerciseError: null
  };
};

const mapDispatchToProps = { addExercise: addNewExercise };

export default connect(mapStateToProps, mapDispatchToProps)(AddExercise);
