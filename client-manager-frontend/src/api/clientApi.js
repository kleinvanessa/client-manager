import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Client';

export const getAllClients = async () => {
  return await axios.get(`${API_URL}/GetAllClients`);
};

export const createClient = async (clientData) => {
  return await axios.post(`${API_URL}/CreateClient`, clientData);
};

export const updateClient = async (id, clientData) => {
  return await axios.put(`${API_URL}/UpdateClient/${id}`, clientData);
};

export const deleteClient = async (id) => {
  return await axios.delete(`${API_URL}/DeleteClient/${id}`);
};
