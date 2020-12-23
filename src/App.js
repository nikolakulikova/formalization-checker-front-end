import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AddExercise from './components/AddExercise';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AddExercise />
      </div>
    </Provider>
  );
}

export default App;
