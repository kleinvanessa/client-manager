import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function BlockUnblockModal({ show, onHide, onConfirm, clientName, isBlocked }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isBlocked ? 'Desbloquear Cliente' : 'Bloquear Cliente'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza de que deseja {isBlocked ? 'desbloquear' : 'bloquear'} o cliente <strong>{clientName}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BlockUnblockModal;
