import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import MainArea from './MainArea';
import PersonalInfoArea from './PersonalInfoArea';
import ClientStatusArea from './ClientStatusArea';
import PasswordArea from './PasswordArea';
import '../styles.css';

function ClientForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    personType: '',
    cpfCnpj: '',
    stateRegistration: '',
    exemptStateRegistration: false,
    gender: '',
    birthDate: '',
    isBlocked: false,
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
  
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'E-Mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-Mail inválido';
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.personType) newErrors.personType = 'Tipo de Pessoa é obrigatório';
  
    if (formData.personType === '1' && !formData.cpfCnpj) {
      newErrors.cpfCnpj = 'CPF é obrigatório';
    } else if (formData.personType === '2' && !formData.cpfCnpj) {
      newErrors.cpfCnpj = 'CNPJ é obrigatório';
    }
  
    if (formData.personType === '2' && !formData.exemptStateRegistration && !formData.stateRegistration) {
      newErrors.stateRegistration = 'Inscrição Estadual é obrigatória';
    }
  
    if (formData.personType === '1') {
      if (!formData.gender) newErrors.gender = 'Gênero é obrigatório';
      if (!formData.birthDate) newErrors.birthDate = 'Data de Nascimento é obrigatória';
    }
  
    if (formData.password.length < 8 || formData.password.length > 15) {
      newErrors.password = 'Senha deve ter entre 8 e 15 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // chamar serviço de adiçao de cliente
      navigate('/');
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      personType: '',
      cpfCnpj: '',
      stateRegistration: '',
      exemptStateRegistration: false,
      gender: '',
      birthDate: '',
      isBlocked: false,
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <Container className="py-4">
      <Button variant="link" onClick={() => navigate('/')} className="mb-3">
        <FaArrowLeft /> Voltar
      </Button>
      <h1 className="mb-4 page-title">Adicionar Cliente</h1>
      <Form onSubmit={handleSubmit}>
        <MainArea formData={formData} handleChange={handleChange} errors={errors} />
        <PersonalInfoArea formData={formData} handleChange={handleChange} errors={errors} />
        <ClientStatusArea formData={formData} handleChange={handleChange} />
        <PasswordArea formData={formData} handleChange={handleChange} errors={errors} />
        <div className="button-group mt-4">
            <Button type="submit" variant="primary">Adicionar Cliente</Button>
            <Button type="button" variant="secondary" onClick={handleClear} className="ml-3">Limpar</Button>
        </div>
      </Form>
    </Container>
  );
}

export default ClientForm;
