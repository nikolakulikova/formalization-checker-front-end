import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './constantsSlice';
import {
  selectCurrentValue,
  /*selectLastValidValue,
  selectErrorStr*/
} from './constantsSlice';

function Constants() {
  const value = useSelector(selectCurrentValue);
  //const lastValidValue = useSelector(selectLastValidValue);
  //const errorStr = useSelector(selectErrorStr);

  const dispatch = useDispatch();

  return (
    <Form.Group>
      <Form.Label><b>Constants:</b></Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Enter constants"
        value={value}
        onChange={e => dispatch(update(e.target.value))}
      />
    </Form.Group>
  );
}

export default Constants;
