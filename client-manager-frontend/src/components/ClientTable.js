import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPhoneNumber, formatDate } from '../utils/formatters';

function ClientTable({ clients, selectedClients, handleSelect, handleSelectAll, setClientIdToDelete, setClientNameToDelete, setShowModal }) {
  return (
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
              <input type="checkbox" checked={client.isBlocked} readOnly />
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
  );
}

export default ClientTable;
