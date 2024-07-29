import React from 'react';
import { Form } from 'react-bootstrap';

const ClientStatusArea = ({ formData, handleChange }) => (
  <div>
    <h3 className="section-title">Situação do Cliente</h3>
    <Form.Group controlId="formIsBlocked">
      <Form.Check
        type="checkbox"
        name="isBlocked"
        checked={formData.isBlocked}
        onChange={handleChange}
        label="Bloqueado"
      />
    </Form.Group>
  </div>
);

export default ClientStatusArea;
