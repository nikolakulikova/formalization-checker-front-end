import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormalization,
  removeFormalization
} from './formulasSlice';
import { selectValues } from './formulasSlice';

function Formalizations(props) {
  const values = useSelector(selectValues)[props.index].formalizations;

  const dispatch = useDispatch();

  const listItems = values.map((x, i) =>
    <Row key={i}>
      <Col>
        <Form.Control className="Formalization" key={i}
          as="textarea"
          placeholder={"Enter formalization #" + (props.index + 1) + "." + (i + 1)}
          value={x.currentValue}
          onChange={e => dispatch(updateFormalization({
            value: e.target.value,
            formulaNum: props.index,
              formalizationNum: i
          }))}
        />
        <Button
          className="EraseFormalizationButton"
          variant="danger"
          size="sm"
          onClick={() => dispatch(removeFormalization({
            formulaNum: props.index,
            formalizationNum: i
          }))}
        >
          Remove
        </Button>
      </Col>
    </Row>
  );

  return (
    <Form.Group>{listItems}</Form.Group>
  );
}

export default Formalizations;
