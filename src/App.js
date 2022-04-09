import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container, Alert, Button, Navbar, Nav
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/login/ProtectedRoute';
import LoginForm from './components/login/LoginForm';
import ExerciseList from './components/solveExercise/ExerciseList';
import SolveExercise from './components/solveExercise/SolveExercise';
import AddExercise from './components/addExercise/AddExercise';
import { logOut } from './redux/userSlice';
import AdminRoute from "./components/login/AdminRoute";
import Exercises from "./components/studentProgress/Exercises";
import PropositionsToExercise from "./components/studentProgress/PropositionsToExercise";
import UsersToProp from "./components/studentProgress/UsersToProp";
import UserSolutionsList from "./components/studentProgress/UserSolutionsList";


function App({ isLoggedIn, user, logOut }) {
  let loginInfo = null;
  if (isLoggedIn) {
    loginInfo = (
      <React.Fragment>
        <span className="px-4 my-auto text-info">
          You are logged in as <b>{ user.username }</b>
        </span>
        <Button as={Link} to="/" onClick={() => logOut()}>
          Log out
        </Button>
      </React.Fragment>
    );
  } else {
    loginInfo = (
      <Button as={Link} to="/login">
        Log in
      </Button>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="dark" variant="dark" sticky="top">
          <Nav className="mr-auto">
            <Nav.Link className="px-4" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="px-4" as={Link} to="/add">
              Add
            </Nav.Link>
            <Nav.Link className="px-4" as={Link} to="/progress">
              Student progress
            </Nav.Link>
          </Nav>
          <Nav>
            { loginInfo }
          </Nav>
          </Navbar>
        <Container className="my-3">
          <Switch>
            <ProtectedRoute exact path="/" component={ExerciseList} />
            <ProtectedRoute exact path="/progress" component={Exercises} />
            <ProtectedRoute exact path="/progress/exercise/proposition" component={PropositionsToExercise} />
            <ProtectedRoute exact path="/progress/exercise/proposition/users" component={UsersToProp} />
            <ProtectedRoute exact path="/progress/exercise/proposition/users/user" component={UserSolutionsList} />
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute path="/solve/:id" component={SolveExercise} />

            <AdminRoute exact path="/add" component={AddExercise}  />

            <Route path="*" component={() => {
              return <Alert variant="danger">404 Not Found</Alert>
            }} />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.isAdmin,
    user: state.user.user
  };
};

const mapDispatchToProps = { logOut };

export default connect(mapStateToProps, mapDispatchToProps)(App);
