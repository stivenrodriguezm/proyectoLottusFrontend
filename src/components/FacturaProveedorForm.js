// src/components/FacturaProveedorForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FacturaProveedorForm = ({ fetchFacturas, facturaToEdit, setSelectedFactura }) => {
  const [numeroFactura, setNumeroFactura] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [fechaRecibido, setFechaRecibido] = useState('');
  const [fechaPago, setFechaPago] = useState('');
  const [pagado, setPagado] = useState(false);
  const [valor, setValor] = useState('');
  const [nota, setNota] = useState('');
  const [productos, setProductos] = useState([]);
  const [inventarios, setInventarios] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');

  useEffect(() => {
    fetchProveedores();
    fetchInventarios();
    if (facturaToEdit) {
      setNumeroFactura(facturaToEdit.numero_factura);
      setProveedor(facturaToEdit.proveedor.id);
      setFechaRecibido(facturaToEdit.fecha_recibido);
      setFechaPago(facturaToEdit.fecha_pago);
      setPagado(facturaToEdit.pagado);
      setValor(facturaToEdit.valor);
      setNota(facturaToEdit.nota);
      setProductos(facturaToEdit.productos.map(p => p.id));
    } else {
      resetForm();
    }
  }, [facturaToEdit]);

  const fetchProveedores = async () => {
    try {
      const response = await api.get('/proveedores/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching proveedores:', error);
    }
  };

  const fetchInventarios = async () => {
    try {
      const response = await api.get('/inventarios/');
      setInventarios(response.data);
    } catch (error) {
      console.error('Error fetching inventarios:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        numero_factura: numeroFactura,
        proveedor,
        fecha_recibido: fechaRecibido,
        fecha_pago: fechaPago,
        pagado,
        valor,
        nota,
        productos
      };
      if (facturaToEdit) {
        await api.put(`/facturas-proveedor/${facturaToEdit.id}/`, data);
      } else {
        await api.post('/facturas-proveedor/', data);
      }
      fetchFacturas();
      setSelectedFactura(null);
      resetForm();
    } catch (error) {
      console.error('Error saving factura:', error.response?.data || error);
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

  const handleAgregarProducto = () => {
    if (productoSeleccionado) {
      setProductos([...productos, productoSeleccionado]);
      setProductoSeleccionado('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Número de Factura:</label>
        <input 
          type="text" 
          value={numeroFactura}
          onChange={(e) => setNumeroFactura(e.target.value)}
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
          {proveedores.map(prov => (
            <option key={prov.id} value={prov.id}>{prov.nombreEmpresa}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha de Recibido:</label>
        <input 
          type="date" 
          value={fechaRecibido}
          onChange={(e) => setFechaRecibido(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Fecha de Pago:</label>
        <input 
          type="date" 
          value={fechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
        />
      </div>
      <div>
        <label>Pagado:</label>
        <input 
          type="checkbox" 
          checked={pagado}
          onChange={(e) => setPagado(e.target.checked)}
        />
      </div>
      <div>
        <label>Valor:</label>
        <input 
          type="number" 
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Nota:</label>
        <textarea 
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
      </div>
      <div>
        <label>Productos:</label>
        <select 
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un producto</option>
          {inventarios.map(prod => (
            <option key={prod.id} value={prod.id}>{prod.nombre}</option>
          ))}
        </select>
        <button type="button" onClick={handleAgregarProducto}>Agregar Producto</button>
      </div>
      <div>
        <h4>Lista de Productos</h4>
        <ul>
          {productos.map((prodId, index) => {
            const prod = inventarios.find(p => p.id === prodId);
            return prod ? <li key={index}>{prod.nombre}</li> : null;
          })}
        </ul>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default FacturaProveedorForm;

