// src/components/EditarOrdenCompraForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditarOrdenCompraForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ordenCompra, setOrdenCompra] = useState({
    cliente: '',
    vendedor: '',
    fecha: '',
    total: '',
    estado: '',
    numero_orden: '',
    fecha_entrega: '',
  });

  useEffect(() => {
    const fetchOrdenCompra = async () => {
      try {
        const response = await api.get(`/ordenes-compra/${id}/`);
        setOrdenCompra(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrdenCompra();
  }, [id]);

  const handleChange = (e) => {
    setOrdenCompra({
      ...ordenCompra,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/ordenes-compra/${id}/`, ordenCompra);
      navigate('/ordenes-compra');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Orden de Compra</h2>
      <div>
        <label>ID Cliente:</label>
        <input
          type="text"
          name="cliente"
          value={ordenCompra.cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Vendedor:</label>
        <input
          type="text"
          name="vendedor"
          value={ordenCompra.vendedor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Venta:</label>
        <input
          type="date"
          name="fecha"
          value={ordenCompra.fecha}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Valor de Venta:</label>
        <input
          type="number"
          name="total"
          value={ordenCompra.total}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Estado:</label>
        <select
          name="estado"
          value={ordenCompra.estado}
          onChange={handleChange}
          required
        >
          <option value="pendiente">Pendiente</option>
          <option value="completa">Completa</option>
        </select>
      </div>
      <div>
        <label>Número de Orden:</label>
        <input
          type="text"
          name="numero_orden"
          value={ordenCompra.numero_orden}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Entrega:</label>
        <input
          type="date"
          name="fecha_entrega"
          value={ordenCompra.fecha_entrega}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default EditarOrdenCompraForm;


