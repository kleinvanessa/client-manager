import { useState } from 'react';
import { addClient, editClient } from '../services/clientService';

export default function useClientForm(clientData, navigate) {
  const [formData, setFormData] = useState({
    name: clientData.name || '',
    email: clientData.email || '',
    phone: clientData.phone || '',
    personType: clientData.clientType?.toString() || '',
    cpfCnpj: clientData.cpfCnpj || '',
    stateRegistration: clientData.stateRegistration || '',
    exemptStateRegistration: clientData.isStateRegistrationExempt || false,
    gender: clientData.gender?.toString() || '',
    birthDate: clientData.birthDate ? new Date(clientData.birthDate).toISOString().split('T')[0] : '',
    isBlocked: clientData.isBlocked || false,
    password: clientData.password || '',
    confirmPassword: clientData.password || ''
  });

  const [errors, setErrors] = useState({});
  const [connectionError, setConnectionError] = useState('');
  const isEditMode = !!clientData.id;

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
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'E-Mail inválido';
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

    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 8 || formData.password.length > 15) {
      newErrors.password = 'Senha deve ter entre 8 e 15 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formattedData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''), 
        clientType: parseInt(formData.personType, 10), 
        cpfCnpj: formData.cpfCnpj.replace(/\D/g, ''),
        stateRegistration: formData.stateRegistration ? formData.stateRegistration.replace(/\D/g, '') : null,
        isStateRegistrationExempt: formData.exemptStateRegistration,
        gender: formData.gender ? parseInt(formData.gender, 10) : null,
        birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString().split('T')[0] : null,
        isBlocked: formData.isBlocked,
        password: formData.password
      };
  
      try {
        if (isEditMode) {
          await editClient(clientData.id, formattedData);
        } else {
          await addClient(formattedData);
        }
        navigate('/');
      } catch (error) {
        const errorMessage = error.response?.data || 'Erro desconhecido ao salvar cliente.';
  
        const newErrors = {};
  
        if (errorMessage.includes('e-mail')) {
          newErrors.email = 'O e-mail já está vinculado a outro cliente.';
        }
        if (errorMessage.includes('CPF/CNPJ')) {
          newErrors.cpfCnpj = 'O CPF/CNPJ já está vinculado a outro cliente.';
        }
        if (errorMessage.includes('Registro Estadual')) {
          newErrors.stateRegistration = 'O Registro Estadual já está vinculado a outro cliente.';
        }
  
        setErrors(newErrors);

        if (error.message.includes('Network Error')) {
          setConnectionError('Falha de conexão com o servidor. Por favor, tente novamente mais tarde.');
        }
      }
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
    setConnectionError('');
  };

  return {
    formData,
    errors,
    connectionError,
    isEditMode,
    handleChange,
    handleSubmit,
    handleClear
  };
}
