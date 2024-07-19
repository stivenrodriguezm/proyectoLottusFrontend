// src/pages/Vendedores.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import VendedorForm from '../components/VendedorForm';

const Vendedores = () => {
  const [vendedores, setVendedores] = useState([]);
  const [selectedVendedor, setSelectedVendedor] = useState(null);

  useEffect(() => {
    fetchVendedores();
  }, []);

  const fetchVendedores = async () => {
    try {
      const response = await api.get('/vendedores/');
      setVendedores(response.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/vendedores/${id}/`);
      fetchVendedores();
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  };

  return (
    <div>
      <h1>Vendedores</h1>
      <ul>
        {vendedores.map(vendedor => (
          <li key={vendedor.id}>
            {vendedor.nombre} - {vendedor.correo}
            <button onClick={() => setSelectedVendedor(vendedor)}>Editar</button>
            <button onClick={() => handleDelete(vendedor.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <VendedorForm 
        fetchVendedores={fetchVendedores} 
        vendedorToEdit={selectedVendedor} 
        setSelectedVendedor={setSelectedVendedor}
      />
    </div>
  );
};

export default Vendedores;

