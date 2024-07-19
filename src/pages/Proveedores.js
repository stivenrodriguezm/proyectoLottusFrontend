// src/pages/Proveedores.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProveedorForm from '../components/ProveedorForm';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await api.get('/proveedores/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/proveedores/${id}/`);
      fetchProveedores();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <div>
      <h1>Proveedores</h1>
      <ul>
        {proveedores.map(proveedor => (
          <li key={proveedor.id}>
            {proveedor.nombreEmpresa} - {proveedor.nombreEncargado}
            <button onClick={() => setSelectedProveedor(proveedor)}>Editar</button>
            <button onClick={() => handleDelete(proveedor.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedProveedor ? (
        <ProveedorForm proveedor={selectedProveedor} fetchProveedores={fetchProveedores} setSelectedProveedor={setSelectedProveedor} />
      ) : (
        <ProveedorForm fetchProveedores={fetchProveedores} />
      )}
    </div>
  );
};

export default Proveedores;
