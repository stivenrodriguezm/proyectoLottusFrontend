// src/pages/OrdenesCompra.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import OrdenCompraForm from '../components/OrdenCompraForm';

const OrdenesCompra = () => {
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [selectedOrdenCompra, setSelectedOrdenCompra] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrdenesCompra();
  }, []);

  const fetchOrdenesCompra = async () => {
    try {
      const response = await api.get('/ordenes-compra/');
      setOrdenesCompra(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/ordenes-compra/${id}/`);
      fetchOrdenesCompra();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/ordenes-compra/editar/${id}`);
  };

  return (
    <div>
      <h1>Órdenes de Compra</h1>
      <ul>
        {ordenesCompra.map(ordenCompra => (
          <li key={ordenCompra.id}>
            {ordenCompra.numero_orden} - {ordenCompra.cliente.nombre} - {ordenCompra.total}
            <button onClick={() => handleEdit(ordenCompra.id)}>Editar</button>
            <button onClick={() => handleDelete(ordenCompra.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <OrdenCompraForm fetchOrdenesCompra={fetchOrdenesCompra} />
    </div>
  );
};

export default OrdenesCompra;
