import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

function AlertSuccess(props) {
  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState(props.msg);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>{msg}</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
    </>
  );
}

function AlertNotify(props) {
  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState(props.msg);

  if (show) {
    return (
      <Alert
        variant={props.variant ? props.variant : "danger"}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{props.header ? props.header : null}</Alert.Heading>
        <p>{msg}</p>
      </Alert>
    );
  } else return null;
}

export { AlertSuccess, AlertNotify };
