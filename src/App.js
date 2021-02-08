import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import ExerciseList from './components/solveExercise/ExerciseList';
import SolveExercise from './components/solveExercise/SolveExercise';
import AddExercise from './components/addExercise/AddExercise';

function App() {
  return (
    <Router>
      <div className="App">
        <Container className="mt-3 mb-3">
          <Switch>
            <Route exact path="/" component={ExerciseList} />
            <Route path="/add" component={AddExercise} />
            <Route path="/solve/:id" component={SolveExercise} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
