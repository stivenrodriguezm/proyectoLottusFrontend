import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/OrdenesPedidoList.css';

const OrdenesPedidoList = () => {
  const [ordenesPedido, setOrdenesPedido] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

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

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div>
      <h2>Ordenes de Pedido</h2>
      <ul>
        {ordenesPedido.map((orden) => (
          <li key={orden.id}>
            <div>
              <span>Orden ID: {orden.id}</span>
              <button onClick={() => toggleExpand(orden.id)}>
                {expandedOrderId === orden.id ? '▲' : '▼'}
              </button>
            </div>
            {expandedOrderId === orden.id && (
              <ul>
                {orden.productos.map((producto) => (
                  <li key={producto.id}>
                    {producto.nombre} - {producto.cantidad} - {producto.descripcion}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdenesPedidoList;
