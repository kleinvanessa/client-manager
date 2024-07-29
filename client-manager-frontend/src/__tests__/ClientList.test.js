import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientList from '../components/ClientList';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchClients, removeClient } from '../services/clientService';

jest.mock('../services/clientService', () => ({
  fetchClients: jest.fn(),
  removeClient: jest.fn(),
}));

describe('ClientList Component', () => {
  test('renders clients and filters correctly', async () => {
    const mockClients = [
      { id: 1, name: 'John Doe', email: 'john@example.com', registrationDate: '2024-01-01' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', registrationDate: '2024-01-02' },
    ];

    fetchClients.mockResolvedValueOnce(mockClients);

    await act(async () => {
      render(
        <Router>
          <ClientList />
        </Router>
      );
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /ordenar/i })).toBeInTheDocument();
  });

  test('handles sorting functionality', async () => {
    const mockClients = [
      { id: 1, name: 'John Doe', email: 'john@example.com', registrationDate: '2024-01-01' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', registrationDate: '2024-01-02' },
    ];

    fetchClients.mockResolvedValueOnce(mockClients);

    await act(async () => {
      render(
        <Router>
          <ClientList />
        </Router>
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /ordenar/i }));
    fireEvent.click(screen.getByText('Nome (A-Z)'));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });  
});
