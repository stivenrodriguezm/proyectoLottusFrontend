// src/components/FacturaProveedorForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FacturaProveedorForm = ({ fetchFacturas }) => {
  const [numeroFactura, setNumeroFactura] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [fechaRecibido, setFechaRecibido] = useState('');
  const [fechaPago, setFechaPago] = useState('');
  const [pagado, setPagado] = useState(false);
  const [valor, setValor] = useState('');
  const [nota, setNota] = useState('');
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  useEffect(() => {
    fetchProveedores();
    fetchProductos();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await api.get('/proveedores/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await api.get('/productos/');
      setProductosDisponibles(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAgregarProducto = () => {
    setProductos([...productos, { productoSeleccionado, cantidad }]);
    setProductoSeleccionado('');
    setCantidad('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/facturas-proveedor/', {
        numero_factura: numeroFactura,
        proveedor,
        fecha_recibido: fechaRecibido,
        fecha_pago: fechaPago,
        pagado,
        valor,
        nota,
        productos,
      });
      fetchFacturas();
      resetForm();
    } catch (error) {
      console.error('Error creating invoice:', error.response?.data || error);
    }
  };

  const resetForm = () => {
    setNumeroFactura('');
    setProveedor('');
    setFechaRecibido('');
    setFechaPago('');
    setPagado(false);
    setValor('');
    setNota('');
    setProductos([]);
  };

  return (
    <div>
      <h3>Crear Factura de Proveedor</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número de Factura:</label>
          <input type="text" value={numeroFactura} onChange={(e) => setNumeroFactura(e.target.value)} required />
        </div>
        <div>
          <label>Proveedor:</label>
          <select value={proveedor} onChange={(e) => setProveedor(e.target.value)} required>
            <option value="">Seleccione un proveedor</option>
            {proveedores.map(prov => (
              <option key={prov.id} value={prov.id}>{prov.nombreEmpresa}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha de Recibido:</label>
          <input type="date" value={fechaRecibido} onChange={(e) => setFechaRecibido(e.target.value)} required />
        </div>
        <div>
          <label>Fecha de Pago:</label>
          <input type="date" value={fechaPago} onChange={(e) => setFechaPago(e.target.value)} required />
        </div>
        <div>
          <label>Pagado:</label>
          <input type="checkbox" checked={pagado} onChange={(e) => setPagado(e.target.checked)} />
        </div>
        <div>
          <label>Valor:</label>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
        </div>
        <div>
          <label>Nota:</label>
          <textarea value={nota} onChange={(e) => setNota(e.target.value)}></textarea>
        </div>
        <hr className="separador" />
        <div className="producto-section">
          <h4>Agregar Producto</h4>
          <div>
            <label>Producto:</label>
            <select value={productoSeleccionado} onChange={(e) => setProductoSeleccionado(e.target.value)}>
              <option value="">Seleccione un producto</option>
              {productosDisponibles.map(prod => (
                <option key={prod.id} value={prod.id}>{prod.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Cantidad:</label>
            <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          </div>
          <button type="button" onClick={handleAgregarProducto}>Agregar Producto</button>
        </div>
        <div>
          <h4>Lista de Productos</h4>
          <ul>
            {productos.map((prod, index) => (
              <li key={index}>
                {prod.productoSeleccionado} - {prod.cantidad}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FacturaProveedorForm;
