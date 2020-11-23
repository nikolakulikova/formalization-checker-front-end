import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  selectLanguage
} from '../redux/languageSlice';

function Clashes(props) {
  return props.errorMessage ? (
    <Row className="Clashes">
      <Col>
        <p className="ClashesMessage">
          {props.errorMessage}
        </p>
      </Col>
    </Row>
  )
  : null;
}

const mapStateToProps = (state) => {
  return {
    errorMessage: selectLanguage(state).errorMessage
  };
};

export default connect(mapStateToProps)(Clashes);
