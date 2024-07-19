// src/components/ProveedorForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ProveedorForm = ({ proveedor, fetchProveedores, setSelectedProveedor }) => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nombreEncargado, setNombreEncargado] = useState('');
  const [nit, setNit] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [nombreContacto1, setNombreContacto1] = useState('');
  const [numeroContacto1, setNumeroContacto1] = useState('');
  const [nombreContacto2, setNombreContacto2] = useState('');
  const [numeroContacto2, setNumeroContacto2] = useState('');

  useEffect(() => {
    if (proveedor) {
      setNombreEmpresa(proveedor.nombreEmpresa);
      setNombreEncargado(proveedor.nombreEncargado);
      setNit(proveedor.nit);
      setCorreo(proveedor.correo);
      setDireccion(proveedor.direccion);
      setNombreContacto1(proveedor.nombreContacto1);
      setNumeroContacto1(proveedor.numeroContacto1);
      setNombreContacto2(proveedor.nombreContacto2 || '');
      setNumeroContacto2(proveedor.numeroContacto2 || '');
    }
  }, [proveedor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const proveedorData = { 
      nombreEmpresa, 
      nombreEncargado, 
      nit, 
      correo, 
      direccion, 
      nombreContacto1, 
      numeroContacto1, 
      nombreContacto2, 
      numeroContacto2 
    };

    try {
      if (proveedor) {
        await api.put(`/proveedores/${proveedor.id}/`, proveedorData);
        setSelectedProveedor(null);
      } else {
        await api.post('/proveedores/', proveedorData);
      }
      fetchProveedores();
      setNombreEmpresa('');
      setNombreEncargado('');
      setNit('');
      setCorreo('');
      setDireccion('');
      setNombreContacto1('');
      setNumeroContacto1('');
      setNombreContacto2('');
      setNumeroContacto2('');
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la Empresa:</label>
        <input 
          type="text" 
          value={nombreEmpresa}
          onChange={(e) => setNombreEmpresa(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Nombre del Encargado:</label>
        <input 
          type="text" 
          value={nombreEncargado}
          onChange={(e) => setNombreEncargado(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>NIT:</label>
        <input 
          type="text" 
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Correo:</label>
        <input 
          type="email" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input 
          type="text" 
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Nombre de Contacto 1:</label>
        <input 
          type="text" 
          value={nombreContacto1}
          onChange={(e) => setNombreContacto1(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Número de Contacto 1:</label>
        <input 
          type="text" 
          value={numeroContacto1}
          onChange={(e) => setNumeroContacto1(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Nombre de Contacto 2:</label>
        <input 
          type="text" 
          value={nombreContacto2}
          onChange={(e) => setNombreContacto2(e.target.value)}
        />
      </div>
      <div>
        <label>Número de Contacto 2:</label>
        <input 
          type="text" 
          value={numeroContacto2}
          onChange={(e) => setNumeroContacto2(e.target.value)}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProveedorForm;
