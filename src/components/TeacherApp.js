import React from 'react';
import { Form, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import Constants from './constants/Constants';
import Predicates from './predicates/Predicates';
import Formulas from './formulas/Formulas';

function TeacherApp() {
  return (
    <Provider store={store}>
      <Container>
        <Form>
          <Jumbotron>
            <Row>
              <Col><Constants /></Col>
              <Col><Predicates /></Col>
            </Row>
          </Jumbotron>
          <Row>
            <Col><Formulas /></Col>
          </Row>
        </Form>
      </Container>
    </Provider>
  );
}

export default TeacherApp;
