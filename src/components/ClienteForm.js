// src/components/ClienteForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ClienteForm = ({ cliente, fetchClientes, setSelectedCliente }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [email, setEmail] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [telefono2, setTelefono2] = useState('');
  const [cedula, setCedula] = useState('');

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre);
      setDireccion(cliente.direccion);
      setCiudad(cliente.ciudad);
      setEmail(cliente.email);
      setTelefono1(cliente.telefono1);
      setTelefono2(cliente.telefono2);
      setCedula(cliente.cedula);
    }
  }, [cliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el correo electrónico
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    const clienteData = { nombre, direccion, ciudad, email, telefono1, telefono2, cedula };

    try {
      console.log('Sending data:', clienteData);
      if (cliente) {
        await api.put(`/clientes/${cliente.id}/`, clienteData);
        setSelectedCliente(null);
      } else {
        await api.post('/clientes/', clienteData);
      }
      fetchClientes();
      resetForm();
    } catch (error) {
      console.error('Error saving client:', error.response?.data || error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setDireccion('');
    setCiudad('');
    setEmail('');
    setTelefono1('');
    setTelefono2('');
    setCedula('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cédula:</label>
        <input 
          type="text" 
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required 
          disabled={!!cliente} // Deshabilitar campo cédula si está editando
        />
      </div>
      <div>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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
        <label>Ciudad:</label>
        <input 
          type="text" 
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Teléfono 1:</label>
        <input 
          type="text" 
          value={telefono1}
          onChange={(e) => setTelefono1(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Teléfono 2:</label>
        <input 
          type="text" 
          value={telefono2}
          onChange={(e) => setTelefono2(e.target.value)}
        />
      </div>
      <button type="submit">Guardar</button>
      {cliente && (
        <button type="button" onClick={() => setSelectedCliente(null)}>Cancelar</button>
      )}
    </form>
  );
};

export default ClienteForm;





