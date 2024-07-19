// src/components/CategoriaForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CategoriaForm = ({ categoria, fetchCategorias, setSelectedCategoria, closeForm }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
      setDescripcion(categoria.descripcion);
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [categoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriaData = { nombre, descripcion };

    try {
      if (categoria) {
        await api.put(`/categorias/${categoria.id}/`, categoriaData);
        setSelectedCategoria(null);
      } else {
        await api.post('/categorias/', categoriaData);
      }
      fetchCategorias();
      resetForm();
      if (closeForm) closeForm();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
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
        <label>Descripción:</label>
        <textarea 
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default CategoriaForm;


