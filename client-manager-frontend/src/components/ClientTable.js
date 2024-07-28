import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPhoneNumber, formatDate } from '../utils/formatters';
import BlockUnblockModal from './BlockUnblockModal';
import { editClient } from '../services/clientService';

function ClientTable({ clients, selectedClients, handleSelect, handleSelectAll, setClientIdToDelete, setClientNameToDelete, setShowModal, fetchClientsList }) {
  const [showBlockUnblockModal, setShowBlockUnblockModal] = useState(false);
  const [clientIdToBlockUnblock, setClientIdToBlockUnblock] = useState(null);
  const [clientNameToBlockUnblock, setClientNameToBlockUnblock] = useState('');
  const [isBlockedStatus, setIsBlockedStatus] = useState(false);

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
                <Link to={`/edit-client/${client.id}`} className="btn btn-secondary mr-2">
                  <i className="bi bi-pencil"></i>
                </Link>
                <Button 
                  variant="danger" 
                  onClick={() => { 
                    setClientIdToDelete(client.id); 
                    setClientNameToDelete(client.name);
                    setShowModal(true); 
                  }}
                >
                  <i className="bi bi-trash"></i>
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
