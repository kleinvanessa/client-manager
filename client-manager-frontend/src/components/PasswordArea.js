import React from 'react';
import { Form } from 'react-bootstrap';

const PasswordArea = ({ formData, handleChange, errors }) => (
  <div>
    <h3 className="section-title">Senha de Acesso</h3>
    <Form.Group controlId="formPassword">
      <Form.Label>Senha</Form.Label>
      <Form.Control
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        minLength={8}
        maxLength={15}
        isInvalid={!!errors.password}
        placeholder= "Digite sua senha"
      />
      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group controlId="formConfirmPassword">
      <Form.Label>Confirmação de Senha</Form.Label>
      <Form.Control
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        minLength={8}
        maxLength={15}
        isInvalid={!!errors.confirmPassword}
        placeholder= "Confirme sua senha"
      />
      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
    </Form.Group>
  </div>
);

export default PasswordArea;
