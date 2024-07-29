import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import MainArea from './MainArea';
import PersonalInfoArea from './PersonalInfoArea';
import ClientStatusArea from './ClientStatusArea';
import PasswordArea from './PasswordArea';
import '../styles.css';
import useClientForm from '../hooks/useClientForm';

function ClientForm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const clientData = location.state?.client || {};
  
  const {
    formData,
    errors,
    connectionError,
    isEditMode,
    handleChange,
    handleSubmit,
    handleClear
  } = useClientForm(clientData, navigate);

  return (
    <Container className="py-4">
      <Button variant="link" onClick={() => navigate('/')} className="mb-3">
        <FaArrowLeft /> Voltar
      </Button>
      <h1 className="mb-4 page-title">{isEditMode ? 'Editar Cliente' : 'Adicionar Cliente'}</h1>
      <Form onSubmit={handleSubmit}>
        <MainArea formData={formData} handleChange={handleChange} errors={errors} />
        <PersonalInfoArea formData={formData} handleChange={handleChange} errors={errors} />
        <ClientStatusArea formData={formData} handleChange={handleChange} />
        <PasswordArea formData={formData} handleChange={handleChange} errors={errors} />
        <div className="button-group mt-4">
          <Button type="submit" variant="primary">{isEditMode ? 'Salvar Alterações' : 'Adicionar Cliente'}</Button>
          {!isEditMode && (
            <Button type="button" variant="secondary" onClick={handleClear} className="ml-3">Limpar</Button>
          )}
        </div>
        {connectionError && <Alert variant="danger" className="mt-3">{connectionError}</Alert>}
        {errors.email && <div className="alert alert-danger mt-3">{errors.email}</div>}
        {errors.cpfCnpj && <div className="alert alert-danger mt-3">{errors.cpfCnpj}</div>}
        {errors.stateRegistration && <div className="alert alert-danger mt-3">{errors.stateRegistration}</div>}
        {errors.form && !errors.email && !errors.cpfCnpj && !errors.stateRegistration && <div className="alert alert-danger mt-3">{errors.form}</div>}
      </Form>
    </Container>
  );
}

export default ClientForm;
