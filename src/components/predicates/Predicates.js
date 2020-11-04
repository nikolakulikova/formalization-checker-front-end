import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './predicatesSlice';
import {
  selectCurrentValue,
  selectErrMessage
} from './predicatesSlice';

function Predicates() {
  const currentValue = useSelector(selectCurrentValue);
  const errMessage = useSelector(selectErrMessage);

  const dispatch = useDispatch();

  return (
    <Form.Group>
      <Form.Label><b>Predicates:</b></Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Enter predicates"
        value={currentValue}
        onChange={e => dispatch(update(e.target.value))}
      />
      <Form.Text className="Error">
        {errMessage}
      </Form.Text>
    </Form.Group>
  );
}

export default Predicates;
