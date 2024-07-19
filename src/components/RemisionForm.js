// src/components/RemisionForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const RemisionForm = ({ fetchRemisiones }) => {
  const [ordenCompra, setOrdenCompra] = useState('');
  const [cliente, setCliente] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [nota, setNota] = useState('');
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [clientes, setClientes] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  useEffect(() => {
    fetchClientes();
    fetchProductos();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes/');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await api.get('/inventario/');
      setProductosDisponibles(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAgregarProducto = () => {
    setProductos([...productos, { productoSeleccionado, cantidad }]);
    setProductoSeleccionado('');
    setCantidad('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/remisiones/', {
        orden_compra: ordenCompra,
        cliente,
        fecha_entrega: fechaEntrega,
        nota,
        productos,
      });
      fetchRemisiones();
      resetForm();
    } catch (error) {
      console.error('Error creating remision:', error.response?.data || error);
    }
  };

  const resetForm = () => {
    setOrdenCompra('');
    setCliente('');
    setFechaEntrega('');
    setNota('');
    setProductos([]);
  };

  return (
    <div>
      <h3>Crear Remisión</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Orden de Compra:</label>
          <input type="text" value={ordenCompra} onChange={(e) => setOrdenCompra(e.target.value)} required />
        </div>
        <div>
          <label>Cliente:</label>
          <select value={cliente} onChange={(e) => setCliente(e.target.value)} required>
            <option value="">Seleccione un cliente</option>
            {clientes.map(cli => (
              <option key={cli.id} value={cli.id}>{cli.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha de Entrega:</label>
          <input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} required />
        </div>
        <div>
          <label>Nota:</label>
          <textarea value={nota} onChange={(e) => setNota(e.target.value)}></textarea>
        </div>
        <hr className="separador" />
        <div className="producto-section">
          <h4>Agregar Producto</h4>
          <div>
            <label>Producto:</label>
            <select value={productoSeleccionado} onChange={(e) => setProductoSeleccionado(e.target.value)}>
              <option value="">Seleccione un producto</option>
              {productosDisponibles.map(prod => (
                <option key={prod.id} value={prod.id}>{prod.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Cantidad:</label>
            <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          </div>
          <button type="button" onClick={handleAgregarProducto}>Agregar Producto</button>
        </div>
        <div>
          <h4>Lista de Productos</h4>
          <ul>
            {productos.map((prod, index) => (
              <li key={index}>
                {prod.productoSeleccionado} - {prod.cantidad}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default RemisionForm;
