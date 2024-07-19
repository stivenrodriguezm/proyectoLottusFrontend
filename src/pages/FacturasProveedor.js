// src/pages/FacturasProveedor.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FacturaProveedorForm from '../components/FacturaProveedorForm';

const FacturasProveedor = () => {
  const [facturas, setFacturas] = useState([]);
  const [selectedFactura, setSelectedFactura] = useState(null);

  useEffect(() => {
    fetchFacturas();
  }, []);

  const fetchFacturas = async () => {
    try {
      const response = await api.get('/facturas-proveedor/');
      setFacturas(response.data);
    } catch (error) {
      console.error('Error fetching facturas:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/facturas-proveedor/${id}/`);
      fetchFacturas();
    } catch (error) {
      console.error('Error deleting factura:', error);
    }
  };

  return (
    <div>
      <h1>Facturas Proveedor</h1>
      <ul>
        {facturas.map(factura => (
          <li key={factura.id}>
            {factura.numero_factura} - {factura.proveedor.nombreEmpresa} - {factura.fecha_recibido}
            <button onClick={() => setSelectedFactura(factura)}>Editar</button>
            <button onClick={() => handleDelete(factura.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <FacturaProveedorForm 
        fetchFacturas={fetchFacturas} 
        facturaToEdit={selectedFactura} 
        setSelectedFactura={setSelectedFactura}
      />
    </div>
  );
};

export default FacturasProveedor;

