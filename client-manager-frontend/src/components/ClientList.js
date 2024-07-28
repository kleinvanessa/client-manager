import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients, removeClient } from '../services/clientService';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import DeleteModal from './DeleteModal';
import ClientTable from './ClientTable';
import PaginationComponent from './PaginationComponent';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [clientIdToDelete, setClientIdToDelete] = useState(null);
  const [clientNameToDelete, setClientNameToDelete] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClientsList();
  }, []);

  const fetchClientsList = async () => {
    const data = await fetchClients();
    setClients(data);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClients(clients.map(client => client.id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedClients([...selectedClients, id]);
    } else {
      setSelectedClients(selectedClients.filter(clientId => clientId !== id));
    }
  };

  const handleDelete = async () => {
    await removeClient(clientIdToDelete);
    fetchClientsList();
    setShowModal(false);
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Consulte os seus Clientes cadastrados na sua Loja ou realize o cadastro de novos Clientes</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <Button variant="info" onClick={handleFilterToggle} className="mr-2">Filtrar</Button>
          <Link to="/add-client" className="btn btn-primary">Adicionar Cliente</Link>
        </Col>
      </Row>
      {showFilter && (
        <Row className="mb-3">
          <Col>
            <Form>
              <Form.Group controlId="formSearch">
                <Form.Label>Pesquisar Clientes</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Pesquisar por nome ou email" 
                  value={searchTerm} 
                  onChange={handleSearchChange} 
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <ClientTable
            clients={currentClients}
            selectedClients={selectedClients}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
            setClientIdToDelete={(id, name) => { setClientIdToDelete(id); setClientNameToDelete(name); }}
            setShowModal={setShowModal}
            setClientNameToDelete={setClientNameToDelete}
            fetchClientsList={fetchClientsList}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <PaginationComponent
            totalClients={filteredClients.length}
            clientsPerPage={clientsPerPage}
            currentPage={currentPage}
            paginate={paginate}
          />
        </Col>
      </Row>
      <DeleteModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        onDelete={handleDelete} 
        clientName={clientNameToDelete}
      />
    </Container>
  );
}

export default ClientList;
