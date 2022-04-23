import React from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    saveExercise,
  checkExercise,
  selectExerciseTitle
} from '../../redux/addExerciseSlice';
import LanguageSection from '../addExercise/LanguageSection';
import PropositionsSection from '../addExercise/PropositionsSection';
import ExerciseTitle from '../addExercise/ExerciseTitle';
import Description from '../addExercise/Description';


function EditExercise({ status, error, containsErrors, title, saveExercise }) {
  let content = null;
  if (status === 'idle') {
    content = (
      <Form>
        <h2>Add exercise</h2>
        <ExerciseTitle />
        <Description />
        <LanguageSection />
        <PropositionsSection />
        <Button
          className="mt-4 mb-5 float-right clearfix"
          variant="primary"
          size="lg"
          disabled={containsErrors}
          onClick={saveExercise}
        >
          Save exercise
        </Button>
      </Form>
    );
  } else if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    content = (
      <Alert variant="success">
        Exercise  was succefully changed to the database.
      </Alert>
    );
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger">
        { error }
      </Alert>
    );
  }

  return content;
}

const mapStateToProps = (state) => {
  return {
    status: state.addExercise.status,
    error: state.addExercise.error,
    containsErrors: checkExercise(state),
    title: selectExerciseTitle(state).value
  };
};

const mapDispatchToProps = {saveExercise };

export default connect(mapStateToProps, mapDispatchToProps)(EditExercise);
