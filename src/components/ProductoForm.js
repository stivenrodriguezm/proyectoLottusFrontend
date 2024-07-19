// src/components/ProductoForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ProductoForm = ({ producto, fetchProductos, setSelectedProducto }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setCategoria(producto.categoria);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setProveedor(producto.proveedor);
    }
    fetchCategorias();
    fetchProveedores();
  }, [producto]);

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias/');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProveedores = async () => {
    try {
      const response = await api.get('/proveedores/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productoData = { nombre, categoria, descripcion, precio, proveedor };

    try {
      if (producto) {
        await api.put(`/productos/${producto.id}/`, productoData);
        setSelectedProducto(null);
      } else {
        await api.post('/productos/', productoData);
      }
      fetchProductos();
      setNombre('');
      setCategoria('');
      setDescripcion('');
      setPrecio('');
      setProveedor('');
    } catch (error) {
      console.error('Error saving product:', error);
    }
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
        <label>Categoría:</label>
        <select 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Descripción:</label>
        <textarea 
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div>
        <label>Precio:</label>
        <input 
          type="number" 
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Proveedor:</label>
        <select 
          value={proveedor} 
          onChange={(e) => setProveedor(e.target.value)}
          required
        >
          <option value="">Seleccione un proveedor</option>
          {proveedores.map(proveedor => (
            <option key={proveedor.id} value={proveedor.id}>{proveedor.nombreEmpresa}</option>
          ))}
        </select>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductoForm;
