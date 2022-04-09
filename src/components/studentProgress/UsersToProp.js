import React, { useEffect } from 'react';
import {Spinner, Alert, ListGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import {Link} from "react-router-dom";
import {
  selectUsers,
  selectStatus,
  selectError,
  fetchAllUsersToProposition, fetchUsersSolutions, selectProposition
} from "../../redux/progressPropositionsSlice";


function UsersToProp({ match, users, status, error, fetchAllUsersToProposition, fetchUsersSolutions, proposition_id })  {

  let { id } = useParams();

  useEffect( () => {
    if (status === 'idle') {
       fetchAllUsersToProposition(id);
    }
  }, [status, id, users, fetchAllUsersToProposition]);

  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    const user_list = users.map((x) => (
        <ListGroup.Item
            as={Link} to={`/progress/exercise/proposition/users/user`} key={x.user_name}
            variant="primary" action
            onClick={() => fetchUsersSolutions({ proposition_id, user_id: x.github_id})}

        >
            { x.user_name }
        </ListGroup.Item>
    ));
    content = (
        <ListGroup>{ user_list }</ListGroup>
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
          <h2 className="mb-4">Users:</h2>
          { content }
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: selectUsers(state),
    proposition_id: selectProposition(state),
    status: selectStatus(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = { fetchAllUsersToProposition, fetchUsersSolutions };

export default connect(mapStateToProps, mapDispatchToProps)(UsersToProp);
