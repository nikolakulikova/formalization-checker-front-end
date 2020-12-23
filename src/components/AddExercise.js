import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewExercise, selectExercise } from '../redux/newExerciseSlice';
import LanguageSection from './LanguageSection';
import PropositionsSection from './PropositionsSection';

function AddExercise(props) {
  let containsErrors = false;
  if (props.exerciseError) {
    containsErrors = true;
  }

  return (
    <Container>
      <Form>
        <LanguageSection />
        <PropositionsSection />
        <Button
          className="SaveExerciseButton"
          variant="primary"
          size="lg"
          onClick={() => {
            if (!containsErrors) {
              props.addNewExercise(props.exercise);
            }
          }}
        >
          Save this exercise
        </Button>
      </Form>
    </Container>
  );
}

const mapStateToProps = (state) => {
  let exercise = selectExercise(state);
  if (exercise.error) {
    return {
      exerciseError: exercise.error
    };
  }
  return {
    exercise: exercise
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewExercise: (exercise) => dispatch(addNewExercise(exercise))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExercise);
