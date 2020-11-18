import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Formalization from './Formalization';
import {
  addNewFormalization,
  removeProposition,
  updateInformalValue,
  selectInformalValue,
  selectFormalizations
} from '../redux/propositionsSlice';

function Proposition(props) {
  const formalizations = props.formalizations.map((x, j) => (
    <Formalization key={j} i={props.i} j={j} />
  ));

  return (
    <div className="Proposition">
      <Row>
        <Col>
          <Form.Group controlId={"formProposition" + props.i}>
            <Form.Label className="Label">
              {"Proposition " + (props.i + 1)}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter proposition"
              value={props.value}
              onChange={(e) => props.update(e.target.value, props.i)}
            />
            <Button
              className="SmallButton"
              variant="outline-danger"
              size="sm"
              onClick={() => props.remove(props.i)}
            >
              Remove this proposition
            </Button>
          </Form.Group>
        </Col>
      </Row>
      {formalizations}
      <Row>
        <Col>
          <Button
            className="AddFormalizationButton"
            variant="primary"
            size="sm"
            onClick={() => props.add(props.i)}
          >
            Add formalization
          </Button>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: selectInformalValue(state, ownProps.i),
    formalizations: selectFormalizations(state, ownProps.i)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (i) => dispatch(addNewFormalization(i)),
    remove: (i) => dispatch(removeProposition(i)),
    update: (value, i) => dispatch(updateInformalValue({
      value: value,
      i: i
    }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposition);
