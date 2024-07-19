// src/components/InventarioList.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/InventarioList.css';

const InventarioList = () => {
  const [inventario, setInventario] = useState([]);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    fetchInventario();
    fetchCategorias();
    fetchProveedores();
  }, []);

  const fetchInventario = async () => {
    try {
      const response = await api.get('/inventario/');
      setInventario(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias/');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProveedores = async () => {
    try {
      const response = await api.get('/proveedores/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/inventario/', {
        nombre,
        categoria,
        descripcion,
        precio,
        proveedor
      });
      fetchInventario();
      resetForm();
    } catch (error) {
      console.error('Error creating inventory item:', error.response?.data || error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setCategoria('');
    setDescripcion('');
    setPrecio('');
    setProveedor('');
  };

  return (
    <div>
      <h3>Inventario</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Categoria:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="">Seleccione una categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>
        <div>
          <label>Proveedor:</label>
          <select value={proveedor} onChange={(e) => setProveedor(e.target.value)} required>
            <option value="">Seleccione un proveedor</option>
            {proveedores.map(prov => (
              <option key={prov.id} value={prov.id}>{prov.nombreEmpresa}</option>
            ))}
          </select>
        </div>
        <button type="submit">Agregar</button>
      </form>
      <h4>Lista de Inventario</h4>
      <ul>
        {inventario.map(item => (
          <li key={item.id}>
            {item.nombre} - {item.categoria} - {item.descripcion} - {item.precio} - {item.proveedor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventarioList;
