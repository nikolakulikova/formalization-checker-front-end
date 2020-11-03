import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './predicatesSlice';
import {
  selectCurrentValue,
  /*selectLastValidValue,
  selectErrorStr*/
} from './predicatesSlice';

function Predicates() {
  const value = useSelector(selectCurrentValue);
  //const lastValidValue = useSelector(selectLastValidValue);
  //const errorStr = useSelector(selectErrorStr);

  const dispatch = useDispatch();

  return (
    <Form.Group>
      <Form.Label><b>Predicates:</b></Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Enter predicates"
        value={value}
        onChange={e => dispatch(update(e.target.value))}
      />
    </Form.Group>
  );
}

export default Predicates;
