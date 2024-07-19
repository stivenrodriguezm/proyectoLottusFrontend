// src/pages/Categorias.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CategoriaForm from '../components/CategoriaForm';  // Importa el componente

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias/');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categorias/${id}/`);
      fetchCategorias();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (categoria) => {
    setSelectedCategoria(categoria);
    setIsEditing(true);
  };

  const handleFormClose = () => {
    setSelectedCategoria(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            {categoria.nombre}
            <button onClick={() => handleEdit(categoria)}>Editar</button>
            <button onClick={() => handleDelete(categoria.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {isEditing && (
        <CategoriaForm
          categoria={selectedCategoria}
          fetchCategorias={fetchCategorias}
          setSelectedCategoria={setSelectedCategoria}
          closeForm={handleFormClose}
        />
      )}
      {!isEditing && (
        <CategoriaForm fetchCategorias={fetchCategorias} />
      )}
    </div>
  );
};

export default Categorias;


