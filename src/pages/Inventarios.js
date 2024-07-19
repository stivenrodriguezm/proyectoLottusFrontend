// src/pages/Inventarios.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import InventarioForm from '../components/InventarioForm';  // Importa el componente

const Inventarios = () => {
  const [inventarios, setInventarios] = useState([]);
  const [selectedInventario, setSelectedInventario] = useState(null);

  useEffect(() => {
    fetchInventarios();
  }, []);

  const fetchInventarios = async () => {
    try {
      const response = await api.get('/inventarios/');
      setInventarios(response.data);
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inventarios/${id}/`);
      fetchInventarios();
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  return (
    <div>
      <h1>Inventarios</h1>
      <ul>
        {inventarios.map(inventario => (
          <li key={inventario.id}>
            {inventario.producto.nombre} - {inventario.disponible ? 'Disponible' : 'No Disponible'}
            <button onClick={() => setSelectedInventario(inventario)}>Editar</button>
            <button onClick={() => handleDelete(inventario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedInventario && <InventarioForm inventario={selectedInventario} fetchInventarios={fetchInventarios} setSelectedInventario={setSelectedInventario} />}
      <InventarioForm fetchInventarios={fetchInventarios} />
    </div>
  );
};

export default Inventarios;
