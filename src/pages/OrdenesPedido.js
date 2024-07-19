// src/pages/OrdenesPedido.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import OrdenPedidoForm from '../components/OrdenPedidoForm';
import OrdenesPedidoList from '../components/OrdenesPedidoList';

const OrdenesPedido = () => {
  const [ordenesPedido, setOrdenesPedido] = useState([]);

  useEffect(() => {
    fetchOrdenesPedido();
  }, []);

  const fetchOrdenesPedido = async () => {
    try {
      const response = await api.get('/ordenes-pedido/');
      setOrdenesPedido(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h1>Órdenes de Pedido</h1>
      <OrdenPedidoForm fetchOrdenesPedido={fetchOrdenesPedido} />
      <OrdenesPedidoList />
    </div>
  );
};

export default OrdenesPedido;


