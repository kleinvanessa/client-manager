import { getAllClients, createClient, updateClient, deleteClient } from '../api/clientApi';

export const fetchClients = async () => {
  try {
    const response = await getAllClients();
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const addClient = async (clientData) => {
  try {
    const response = await createClient(clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const editClient = async (id, clientData) => {
  try {
    const response = await updateClient(id, clientData);
    return response.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

export const removeClient = async (id) => {
  try {
    const response = await deleteClient(id);
    return response.data;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};
