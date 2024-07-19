// src/pages/Clientes.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ClienteForm from '../components/ClienteForm';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes/');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/clientes/${id}/`);
      fetchClientes();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {cliente.nombre} - {cliente.cedula}
            <button onClick={() => setSelectedCliente(cliente)}>Editar</button>
            <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedCliente ? (
        <ClienteForm cliente={selectedCliente} fetchClientes={fetchClientes} setSelectedCliente={setSelectedCliente} />
      ) : (
        <ClienteForm fetchClientes={fetchClientes} />
      )}
    </div>
  );
};

export default Clientes;
