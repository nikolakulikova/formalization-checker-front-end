import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormalization,
} from './formulasSlice';
import { selectValues } from './formulasSlice';

function Formalizations(props) {
  const values = useSelector(selectValues)[props.index].formalizations;

  const dispatch = useDispatch();

  const listItems = values.map((x, i) =>
    <Form.Control key={i}
      as="textarea"
      placeholder={"Enter formalization #"
                    + (props.index + 1) + "." + (i + 1)}
      value={x.currentValue}
      onChange={e => dispatch(updateFormalization({
        value: e.target.value,
        formulaNum: props.index,
        formalizationNum: i
      }))}
    />
  );

  return (
    <Form.Group>
      {listItems}
    </Form.Group>
  );
}

export default Formalizations;
