import React from 'react';
import { Form } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import '../styles.css';

const MainArea = ({ formData, handleChange, errors }) => {
  const phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    handleChange({ target: { name, value: numericValue } });
  };

  return (
    <div>
      <h3 className="section-title">Área Principal</h3>
      <Form.Group controlId="formName">
        <Form.Label>Nome do Cliente/Razão Social</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          maxLength={150}
          isInvalid={!!errors.name}
          placeholder="Digite o Nome do Cliente ou Razão Social"
          required
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>E-Mail</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          maxLength={150}
          isInvalid={!!errors.email}
          placeholder="exemplo@exemplo.com"
          required
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Telefone</Form.Label>
        <MaskedInput
          mask={phoneMask}
          name="phone"
          className="form-control"
          value={formData.phone ? formData.phone.replace(/\D/g, '') : ''}
          onChange={handlePhoneChange}
          guide={false}
          placeholder="(00) 00000-0000"
          type="text"
          maxLength={15}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default MainArea;
