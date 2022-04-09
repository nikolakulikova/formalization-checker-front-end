import React, { useEffect } from 'react';
import {Spinner, Alert, ListGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  selectExercise,
  selectStatus,
  selectError,
  fetchExercise
} from '../../redux/solveExerciseSlice';
import { useParams } from 'react-router';
import {Link} from "react-router-dom";
import {fetchAllUsersToProposition} from "../../redux/progressPropositionsSlice";


function PropositionToExercise({ exercise, status, error, fetchAllUsersToProposition, fetchExercise })  {

  let { id } = useParams();

  useEffect(() => {
    if (status === 'idle') {
      fetchExercise(id);
    }
  }, [status, id, exercise, fetchExercise]);

  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    const propositions_list = exercise.propositions.map((x) => (
        <ListGroup.Item
            as={Link} to={`/progress/exercise/proposition/users`} key={x.proposition_id}
            variant="primary" action
            onClick={() => fetchAllUsersToProposition(x.proposition_id)}
        >

            { x.proposition }
        </ListGroup.Item>
    ));
    content = (
        <ListGroup>{ propositions_list }</ListGroup>
    );
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  return (
      <div>
          <h2 className="mb-4">Propositions to exercise:</h2>
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

const mapDispatchToProps = { fetchAllUsersToProposition, fetchExercise };

export default connect(mapStateToProps, mapDispatchToProps)(PropositionToExercise);
