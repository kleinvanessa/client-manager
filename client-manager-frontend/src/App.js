import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientList />} />
        <Route path="/add-client" element={<ClientForm />} />
        <Route path="/edit-client/:id" element={<ClientForm />} />
      </Routes>
    </Router>
  );
}

export default App;
