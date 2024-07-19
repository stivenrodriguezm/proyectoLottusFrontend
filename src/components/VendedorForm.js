// src/components/VendedorForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const VendedorForm = ({ fetchVendedores, vendedorToEdit, setSelectedVendedor }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [esJefe, setEsJefe] = useState(false);
  const [nombreContactoEmergencia, setNombreContactoEmergencia] = useState('');
  const [numeroContactoEmergencia, setNumeroContactoEmergencia] = useState('');
  const [estado, setEstado] = useState('activo');

  useEffect(() => {
    if (vendedorToEdit) {
      setNombre(vendedorToEdit.nombre);
      setCorreo(vendedorToEdit.correo);
      setEsJefe(vendedorToEdit.esJefe);
      setNombreContactoEmergencia(vendedorToEdit.nombreContactoEmergencia);
      setNumeroContactoEmergencia(vendedorToEdit.numeroContactoEmergencia);
      setEstado(vendedorToEdit.estado);
    } else {
      resetForm();
    }
  }, [vendedorToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { nombre, correo, esJefe, nombreContactoEmergencia, numeroContactoEmergencia, estado };
      if (vendedorToEdit) {
        await api.put(`/vendedores/${vendedorToEdit.id}/`, data);
      } else {
        await api.post('/vendedores/', data);
      }
      fetchVendedores();
      setSelectedVendedor(null);
      resetForm();
    } catch (error) {
      console.error('Error saving vendor:', error.response?.data || error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setCorreo('');
    setEsJefe(false);
    setNombreContactoEmergencia('');
    setNumeroContactoEmergencia('');
    setEstado('activo');
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Correo:</label>
        <input 
          type="email" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Jefe:</label>
        <input 
          type="checkbox" 
          checked={esJefe}
          onChange={(e) => setEsJefe(e.target.checked)}
        />
      </div>
      <div>
        <label>Nombre Contacto Emergencia:</label>
        <input 
          type="text" 
          value={nombreContactoEmergencia}
          onChange={(e) => setNombreContactoEmergencia(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Numero Contacto Emergencia:</label>
        <input 
          type="text" 
          value={numeroContactoEmergencia}
          onChange={(e) => setNumeroContactoEmergencia(e.target.value)}
          required 
        />
      </div>
      {vendedorToEdit && (
        <div>
          <label>Estado:</label>
          <select 
            value={estado} 
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      )}
      <button type="submit">Guardar</button>
    </form>
  );
};

export default VendedorForm;





