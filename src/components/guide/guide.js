import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Guide = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useState(() => {
    if(!localStorage.getItem('readGuide')) {
        setShow(true)
    }
  }, [])

  const handleHide = () => {
      localStorage.setItem('readGuide', true)
      setShow(false)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
        How to use the app
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>How to use this app</Modal.Title>
        </Modal.Header>
        <Modal.Body>We can add HTML content for guide here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Hide Guide
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Guide;
