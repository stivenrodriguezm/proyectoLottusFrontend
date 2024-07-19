// src/pages/Productos.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductoForm from '../components/ProductoForm';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await api.get('/productos/');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/productos/${id}/`);
      fetchProductos();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - {producto.categoria.nombre} - ${producto.precio}
            <button onClick={() => setSelectedProducto(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedProducto ? (
        <ProductoForm producto={selectedProducto} fetchProductos={fetchProductos} setSelectedProducto={setSelectedProducto} />
      ) : (
        <ProductoForm fetchProductos={fetchProductos} />
      )}
    </div>
  );
};

export default Productos;

