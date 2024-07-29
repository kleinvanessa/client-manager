import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber, formatDate } from '../utils/formatters';
import BlockUnblockModal from './BlockUnblockModal';
import { editClient } from '../services/clientService';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ClientTable({ clients, selectedClients, handleSelect, handleSelectAll, setClientIdToDelete, setClientNameToDelete, setShowModal, fetchClientsList }) {
  const [showBlockUnblockModal, setShowBlockUnblockModal] = useState(false);
  const [clientIdToBlockUnblock, setClientIdToBlockUnblock] = useState(null);
  const [clientNameToBlockUnblock, setClientNameToBlockUnblock] = useState('');
  const [isBlockedStatus, setIsBlockedStatus] = useState(false);
  const navigate = useNavigate();

  const handleBlockUnblock = (client) => {
    setClientIdToBlockUnblock(client.id);
    setClientNameToBlockUnblock(client.name);
    setIsBlockedStatus(client.isBlocked);
    setShowBlockUnblockModal(true);
  };

  const confirmBlockUnblock = async () => {
    try {
      const updatedClient = { ...clients.find(client => client.id === clientIdToBlockUnblock), isBlocked: !isBlockedStatus };
      await editClient(clientIdToBlockUnblock, updatedClient);
      fetchClientsList();
    } catch (error) {
      console.error('Error updating client:', error);
    } finally {
      setShowBlockUnblockModal(false);
    }
  };

  const handleEdit = (client) => {
    navigate(`/edit-client/${client.id}`, { state: { client } });
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <input type="checkbox" onChange={handleSelectAll} />
            </th>
            <th>Nome/Razão Social</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Cadastro</th>
            <th>Bloqueado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <td>{index + 1}</td>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedClients.includes(client.id)} 
                  onChange={(e) => handleSelect(e, client.id)} 
                />
              </td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{formatPhoneNumber(client.phone)}</td>
              <td>{formatDate(client.registrationDate)}</td>
              <td>
                <input 
                  type="checkbox" 
                  checked={client.isBlocked} 
                  onChange={() => handleBlockUnblock(client)}
                />
              </td>
              <td>
                <Button 
                  variant="link" 
                  onClick={() => handleEdit(client)} 
                  className="p-0" 
                  style={{ color: '#007bff', marginRight: '1rem' }}
                >
                  <FaEdit size={20} />
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => { 
                    setClientIdToDelete(client.id); 
                    setClientNameToDelete(client.name);
                    setShowModal(true); 
                  }}
                  className="p-0"
                  style={{ color: '#6c757d' }}
                >
                  <FaTrash size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BlockUnblockModal
        show={showBlockUnblockModal}
        onHide={() => setShowBlockUnblockModal(false)}
        onConfirm={confirmBlockUnblock}
        clientName={clientNameToBlockUnblock}
        isBlocked={isBlockedStatus}
      />
    </>
  );
}

export default ClientTable;
