import React from 'react';
import { Form } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import '../styles.css';

const PersonalInfoArea = ({ formData, handleChange, errors }) => {
  const handlePersonTypeChange = (event) => {
    handleChange(event);
    handleChange({ target: { name: 'cpfCnpj', value: '' } });
  };

  const handleExemptStateRegistrationChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      handleChange({ target: { name: 'stateRegistration', value: '' } });
    }
    handleChange(event);
  };

  const getCpfCnpjMask = () => {
    const { personType, cpfCnpj } = formData;
    if (personType === '1') {
      return cpfCnpj.length <= 14
        ? [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
        : [];
    } else if (personType === '2') {
      return cpfCnpj.length <= 18
        ? [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
        : [];
    }
    return [];
  };

  const getStateRegistrationMask = () => {
    const { stateRegistration } = formData;
    return stateRegistration.length <= 15
      ? [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
      : [];
  };

  return (
    <div>
      <h3 className="section-title">Informações Pessoais</h3>

      <Form.Group controlId="formPersonType">
        <Form.Label>Tipo de Pessoa</Form.Label>
        <Form.Control
          as="select"
          name="personType"
          value={formData.personType || ''}
          onChange={handlePersonTypeChange}
          isInvalid={!!errors.personType}
          required
        >
          <option value="">Selecione</option>
          <option value="1">Física</option>
          <option value="2">Jurídica</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.personType}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formCpfCnpj">
        <Form.Label>CPF/CNPJ</Form.Label>
        <MaskedInput
          mask={getCpfCnpjMask()}
          name="cpfCnpj"
          className="form-control"
          value={formData.cpfCnpj || ''}
          onChange={handleChange}
          guide={false}
          placeholder={formData.personType === '1' ? '000.000.000-00' : '00.000.000/0001-00'}
          type="text"
          maxLength={formData.personType === '1' ? 14 : 18}
          required
          isInvalid={!!errors.cpfCnpj}
        />
        <Form.Control.Feedback type="invalid">{errors.cpfCnpj}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formStateRegistration">
        <Form.Label>Inscrição Estadual</Form.Label>
        <MaskedInput
          mask={getStateRegistrationMask()}
          name="stateRegistration"
          className="form-control"
          value={formData.stateRegistration || ''}
          onChange={handleChange}
          guide={false}
          placeholder={'000.000.000-000'}
          type="text"
          maxLength={15}
          disabled={(formData.personType === '1' && formData.exemptStateRegistration) || formData.personType === ''}
          required={!formData.exemptStateRegistration}
          isInvalid={!!errors.stateRegistration}
        />
        <Form.Control.Feedback type="invalid">{errors.stateRegistration}</Form.Control.Feedback>
        {formData.personType === '1' && (
          <Form.Check
            type="checkbox"
            name="exemptStateRegistration"
            checked={formData.exemptStateRegistration || false}
            onChange={handleExemptStateRegistrationChange}
            label="Isento de Inscrição Estadual"
          />
        )}
      </Form.Group>

      {formData.personType === '1' && (
        <>
          <Form.Group controlId="formGender">
            <Form.Label>Gênero</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              isInvalid={!!errors.gender}
              required
            >
              <option value="">Selecione</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
              <option value="3">Outro</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBirthDate">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={formData.birthDate || ''}
              onChange={handleChange}
              isInvalid={!!errors.birthDate}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.birthDate}</Form.Control.Feedback>
          </Form.Group>
        </>
      )}
    </div>
  );
};

export default PersonalInfoArea;
