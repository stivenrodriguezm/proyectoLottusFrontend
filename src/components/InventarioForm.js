// src/components/InventarioForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const InventarioForm = ({ inventario, fetchInventarios, setSelectedInventario }) => {
  const [producto, setProducto] = useState('');
  const [disponible, setDisponible] = useState(true);

  useEffect(() => {
    if (inventario) {
      setProducto(inventario.producto.id);
      setDisponible(inventario.disponible);
    }
  }, [inventario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inventarioData = { producto, disponible };

    try {
      if (inventario) {
        await api.put(`/inventarios/${inventario.id}/`, inventarioData);
        setSelectedInventario(null);
      } else {
        await api.post('/inventarios/', inventarioData);
      }
      fetchInventarios();
      setProducto('');
      setDisponible(true);
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Producto:</label>
        <input 
          type="text" 
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Disponible:</label>
        <input 
          type="checkbox" 
          checked={disponible}
          onChange={(e) => setDisponible(e.target.checked)}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default InventarioForm;
