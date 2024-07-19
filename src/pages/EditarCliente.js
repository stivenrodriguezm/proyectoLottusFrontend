// src/pages/EditarCliente.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [email, setEmail] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [telefono2, setTelefono2] = useState('');

  useEffect(() => {
    fetchCliente();
  }, [id]);

  const fetchCliente = async () => {
    try {
      const response = await api.get(`/clientes/${id}/`);
      setCliente(response.data);
      setNombre(response.data.nombre);
      setDireccion(response.data.direccion);
      setCiudad(response.data.ciudad);
      setEmail(response.data.email);
      setTelefono1(response.data.telefono1);
      setTelefono2(response.data.telefono2);
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };

  const handleUpdateCliente = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clientes/${id}/`, { nombre, direccion, ciudad, email, telefono1, telefono2 });
      navigate('/clientes');
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  if (!cliente) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Editar Cliente</h1>
      <form onSubmit={handleUpdateCliente}>
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
        <button type="submit">Actualizar Cliente</button>
      </form>
    </div>
  );
};

export default EditarCliente;
