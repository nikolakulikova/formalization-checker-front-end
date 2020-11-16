import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../redux/store';
import LanguageSection from './LanguageSection';
import PropositionsSection from './PropositionsSection';

function TeacherApp() {
  return (
    <Provider store={store}>
      <Container>
        <Form>
          <LanguageSection />
          <PropositionsSection />
        </Form>
      </Container>
    </Provider>
  );
}

export default TeacherApp;
