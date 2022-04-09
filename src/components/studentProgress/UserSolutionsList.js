import React, { useEffect } from 'react';
import {Spinner, Alert, ListGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import {Link} from "react-router-dom";
import {
  selectUsers,
  selectStatus,
  selectError,
  fetchAllUsersToProposition, fetchUsersSolutions, selectUsersSolution
} from "../../redux/progressPropositionsSlice";


function UsersSolutionList({ solutions, users, status, error, fetchUsersSolutions })  {

  let { id } = useParams();

  useEffect( () => {
    if (status === 'idle') {
      fetchUsersSolutions(id, id);
    }
  }, [status, id, users, fetchUsersSolutions]);

  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    const solution = solutions.map((x) => (
        x.is_correct ?
              <Alert variant="success" key={x.date}>
                {x.date}
                {x.solution}
              </Alert>
            : <Alert variant="danger" key={x.date}>
                {x.date.replace("T", " ").split(".")[0] + " "}
                {x.solution}
              </Alert>

    ));
    content = (
        <ListGroup>{ solution }</ListGroup>
    );
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger">
        ahoj
        {error}
      </Alert>
    );
  }

  return (
      <div>
          <h2 className="mb-4">Solutions:</h2>
          { content }
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    solutions: selectUsersSolution(state),
    status: selectStatus(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = { fetchAllUsersToProposition, fetchUsersSolutions };

export default connect(mapStateToProps, mapDispatchToProps)(UsersSolutionList);
