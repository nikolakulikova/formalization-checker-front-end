import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateInformalValue,
  addNewFormula,
  addNewFormalization
} from './formulasSlice';
import { selectValues } from './formulasSlice';
import Formalizations from './Formalizations';

function Formulas() {
  const values = useSelector(selectValues);

  const dispatch = useDispatch();

  const listItems = values.map((x, index) =>
    <Form.Group key={index}>
      <Row>
        <Col>
          <Form.Control
            as="textarea"
            placeholder={"Enter formula #" + (index + 1)} 
            value={x.informalValue}
            onChange={e => dispatch(updateInformalValue({
              value: e.target.value,
              formulaNum: index
            }))}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => dispatch(addNewFormalization(index))}
          >
            Add new formalization
          </Button>
        </Col>
        <Col>
          <Formalizations index={index} />
        </Col>
      </Row>
    </Form.Group>
  );

  return (
    <Form.Group>
      <Row>
        <Col>
          <Form.Label><b>Formulas:</b></Form.Label>
        </Col>
      </Row>
      {listItems}
      <Row>
        <Col>
          <Button
            variant="primary"
            size="lg"
            onClick={() => dispatch(addNewFormula())}
          >
            Add new formula
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
}

export default Formulas;
