// src/pages/OrdenPedidoForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/OrdenPedidoForm.css';  // Asegúrate de crear un archivo CSS para estilos personalizados

const OrdenPedidoForm = ({ fetchOrdenesPedido }) => {
  const [ordenCompra, setOrdenCompra] = useState('');
  const [ordenesCompraPendientes, setOrdenesCompraPendientes] = useState([]);
  const [proveedor, setProveedor] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [fechaGeneracion, setFechaGeneracion] = useState('');
  const [fechaDespacho, setFechaDespacho] = useState('');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [vendedor, setVendedor] = useState(''); // Estado para almacenar el nombre del vendedor
  const [productosFiltrados, setProductosFiltrados] = useState([]); // Productos filtrados por proveedor y categoría

  useEffect(() => {
    fetchOrdenesCompraPendientes();
    fetchProveedores();
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (proveedor && categoriaSeleccionada) {
      fetchProductosFiltrados(proveedor, categoriaSeleccionada);
    } else {
      setProductosFiltrados([]);
    }
  }, [proveedor, categoriaSeleccionada]);

  const fetchOrdenesCompraPendientes = async () => {
    try {
      const response = await api.get('/ordenes-pedido/pendientes/');
      setOrdenesCompraPendientes(response.data);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    }
  };

  const fetchProveedores = async () => {
    try {
      const response = await api.get('/proveedores/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias/');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProductosFiltrados = async (proveedorId, categoriaId) => {
    try {
      const response = await api.get(`/productos/filtrar/?proveedor=${proveedorId}&categoria=${categoriaId}`);
      setProductosFiltrados(response.data);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  const handleOrdenCompraChange = async (e) => {
    const ordenCompraId = e.target.value;
    setOrdenCompra(ordenCompraId);

    if (ordenCompraId) {
      try {
        const response = await api.get(`/ordenes-compra/${ordenCompraId}/`);
        const ordenCompraData = response.data;
        setVendedor(ordenCompraData.vendedor_nombre); // Suponiendo que el nombre del vendedor se llama "vendedor_nombre"
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    } else {
      setVendedor('');
    }
  };

  const handleAgregarProducto = () => {
    setProductos([...productos, { categoria: categoriaSeleccionada, producto: productoSeleccionado, cantidad, descripcion }]);
    setCategoriaSeleccionada('');
    setProductoSeleccionado('');
    setCantidad('');
    setDescripcion('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedFechaGeneracion = new Date(fechaGeneracion).toISOString().split('T')[0];
    const formattedFechaDespacho = new Date(fechaDespacho).toISOString().split('T')[0];

    const orderData = {
        orden_compra: ordenCompra,
        proveedor,
        fecha_generacion: formattedFechaGeneracion,
        fecha_despacho: formattedFechaDespacho,
        productos: productos.map(prod => ({
            categoria: prod.categoria,
            producto: prod.producto,
            cantidad: prod.cantidad,
            descripcion: prod.descripcion
        })),
    };

    console.log("Order Data:", orderData);

    try {
        const response = await api.post('/ordenes-pedido/', orderData);
        fetchOrdenesPedido();
        resetForm();
    } catch (error) {
        console.error('Error creating order:', error.response?.data || error);
    }
};



  const resetForm = () => {
    setOrdenCompra('');
    setProveedor('');
    setFechaGeneracion('');
    setFechaDespacho('');
    setProductos([]);
    setVendedor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Orden de Pedido</h3>
      <div>
        <label>Orden de Compra:</label>
        <select 
          value={ordenCompra}
          onChange={handleOrdenCompraChange}
          required
        >
          <option value="">Seleccione una orden de compra</option>
          {ordenesCompraPendientes.map(orden => (
            <option key={orden.id} value={orden.id}>{orden.numero_orden}</option>
          ))}
        </select>
      </div>
      {vendedor && <p>Vendedor: {vendedor}</p>}
      <div>
        <label>Proveedor:</label>
        <select 
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          required
        >
          <option value="">Seleccione un proveedor</option>
          {proveedores.map(prov => (
            <option key={prov.id} value={prov.id}>{prov.nombreEmpresa}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha de Generación:</label>
        <input 
          type="date" 
          value={fechaGeneracion}
          onChange={(e) => setFechaGeneracion(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Fecha de Despacho:</label>
        <input 
          type="date" 
          value={fechaDespacho}
          onChange={(e) => setFechaDespacho(e.target.value)}
          required 
        />
      </div>
      <hr className="separador" />
      <div className="producto-section">
        <h4>Agregar Producto</h4>
        <div>
          <label>Categoria:</label>
          <select 
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="">Seleccione una categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Producto:</label>
          <select 
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un producto</option>
            {productosFiltrados.map(prod => (
              <option key={prod.id} value={prod.id}>{prod.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Cantidad:</label>
          <input 
            type="number" 
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input 
            type="text" 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAgregarProducto}>Agregar Producto</button>
      </div>
      <div>
        <h4>Lista de Productos</h4>
        <ul>
          {productos.map((prod, index) => (
            <li key={index}>
              {prod.categoriaSeleccionada} - {prod.productoSeleccionado} - {prod.cantidad} - {prod.descripcion}
            </li>
          ))}
        </ul>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default OrdenPedidoForm;







