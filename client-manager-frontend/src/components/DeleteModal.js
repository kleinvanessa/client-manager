import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteModal({ show, onHide, onDelete, clientName }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação de Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza de que deseja excluir o cliente <strong>{clientName}</strong>?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Deletar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
