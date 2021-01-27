import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './redux/store';
import SolveExercise from './components/solveExercise/SolveExercise';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="App">
          <Container className="mt-3 mb-3">
            <SolveExercise />
          </Container>
        </div>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
