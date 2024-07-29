import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients, removeClient } from '../services/clientService';
import { Container, Row, Col, Button, Form, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
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
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientsList();
  }, []);

  const fetchClientsList = async () => {
    setLoading(true);
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
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

  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const sortedClients = [...clients].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === 'registrationDate') {
      return sortOrder === 'asc' ? new Date(a.registrationDate) - new Date(b.registrationDate) : new Date(b.registrationDate) - new Date(a.registrationDate);
    }
    return 0;
  });

  const filteredClients = sortedClients.filter(client => {
    const matchesSearchTerm = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

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
        <Col className="d-flex justify-content-start align-items-center">
          {clients.length > 0 && (
            <>
              <DropdownButton id="dropdown-basic-button" title="Ordenar" className="mr-3">
                <Dropdown.Item onClick={() => handleSort('name', 'asc')}>Nome (A-Z)</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('name', 'desc')}>Nome (Z-A)</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('registrationDate', 'asc')}>Data de Cadastro (Crescente)</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('registrationDate', 'desc')}>Data de Cadastro (Decrescente)</Dropdown.Item>
              </DropdownButton>
              <Button 
                variant="link" 
                onClick={handleFilterToggle} 
                className="p-0" 
                style={{ boxShadow: 'none', marginLeft: '1.5rem' }}
              >
                <FaFilter size={20} style={{ color: '#6c757d' }} /> {}
              </Button>
            </>
          )}
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to="/add-client" className="btn btn-primary">+ Adicionar Cliente</Link>
        </Col>
      </Row>
      {loading ? (
        <Row className="text-center">
          <Col>
            <Spinner animation="border" role="status" style={{ margin: 'auto', display: 'block' }}>
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        <>
          {clients.length === 0 ? (
            <Row className="text-center">
              <Col>
                <img src="/empty.svg" alt="Nenhum cliente encontrado" style={{ maxWidth: '300px', margin: '20px auto' }} />
                <h3 style={{ color: 'blue' }}>Nenhum cliente encontrado</h3>
              </Col>
            </Row>
          ) : (
            <>
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
            </>
          )}
        </>
      )}
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
