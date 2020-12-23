import React from 'react';
import { Form } from 'react-bootstrap';

function SyntaxError(props) {
  if (!props.error) {
    return null;
  }

  const start = props.error.location.start.offset;
  const end = props.error.location.end.offset;

  const str_1 = props.value.substring(0, start);
  const str_2 = props.value.substring(start, end);
  const str_3 = props.value.substring(end);

  const str = props.value === "" ?
    null : (
      <div>
        {str_1}
        <u className="bg-warning">
          {str_2}
        </u>
        {str_3}
      </div>
    );

  return (
    <Form.Text className="Error">
      {str}
      <div className="ErrorMessage">
        {props.error.message}
      </div>
    </Form.Text>
  );
}

export default SyntaxError;
