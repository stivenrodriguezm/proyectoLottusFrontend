// src/components/OrdenCompraForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const OrdenCompraForm = ({ fetchOrdenesCompra }) => {
  const [clienteExistente, setClienteExistente] = useState(false);
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [email, setEmail] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [telefono2, setTelefono2] = useState('');
  const [clienteId, setClienteId] = useState(null);
  const [vendedor, setVendedor] = useState('');
  const [vendedores, setVendedores] = useState([]);
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [numeroOrden, setNumeroOrden] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [clienteNoExiste, setClienteNoExiste] = useState(false); // Estado para manejar el mensaje
  const [clienteYaExiste, setClienteYaExiste] = useState(false); // Estado para manejar el mensaje

  useEffect(() => {
    fetchVendedores();
  }, []);

  const fetchVendedores = async () => {
    try {
      const response = await api.get('/vendedores/?estado=activo');
      setVendedores(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleCedulaChange = async (e) => {
    const cedula = e.target.value;
    setCedula(cedula);
    setClienteNoExiste(false); // Resetear el mensaje cuando cambia la cédula
    setClienteYaExiste(false); // Resetear el mensaje cuando cambia la cédula

    if (clienteExistente && cedula.length > 0) {
      try {
        const response = await api.get(`/clientes/search/?cedula=${cedula}`);
        const cliente = response.data;

        if (cliente) {
          setNombre(cliente.nombre);
          setDireccion(cliente.direccion);
          setCiudad(cliente.ciudad);
          setEmail(cliente.email);
          setTelefono1(cliente.telefono1);
          setTelefono2(cliente.telefono2);
          setClienteId(cliente.id);
        } else {
          resetClienteFields();
          setClienteNoExiste(true); // Mostrar mensaje si el cliente no existe
        }
      } catch (error) {
        console.error('Error fetching client:', error);
        resetClienteFields();
        setClienteNoExiste(true); // Mostrar mensaje si el cliente no existe
      }
    } else if (!clienteExistente && cedula.length > 0) {
      // Verificar si el cliente ya existe cuando se está agregando un cliente nuevo
      try {
        const response = await api.get(`/clientes/search/?cedula=${cedula}`);
        const cliente = response.data;

        if (cliente) {
          setClienteYaExiste(true); // Mostrar mensaje si el cliente ya existe
        } else {
          setClienteYaExiste(false);
        }
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    } else {
      resetClienteFields();
    }
  };

  const resetClienteFields = () => {
    setNombre('');
    setDireccion('');
    setCiudad('');
    setEmail('');
    setTelefono1('');
    setTelefono2('');
    setClienteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let clienteData;
    try {
      if (!clienteExistente) {
        const clienteResponse = await api.post('/clientes/', {
          cedula,
          nombre,
          direccion,
          ciudad,
          email,
          telefono1,
          telefono2,
        });
        clienteData = clienteResponse.data;
      } else if (clienteId) {
        clienteData = { id: clienteId };
      } else {
        console.error('Cliente no encontrado');
        return;
      }

      const ordenCompraData = {
        cliente: clienteData.id || clienteId,
        vendedor,
        fecha,
        total,
        estado,
        numero_orden: numeroOrden,
        fecha_entrega: fechaEntrega,
      };

      await api.post('/ordenes-compra/', ordenCompraData);
      fetchOrdenesCompra();
      resetForm();
    } catch (error) {
      console.error('Error saving order:', error.response?.data || error);
    }
  };

  const resetForm = () => {
    setCedula('');
    resetClienteFields();
    setVendedor('');
    setFecha('');
    setTotal('');
    setEstado('pendiente');
    setNumeroOrden('');
    setFechaEntrega('');
    setClienteNoExiste(false); // Resetear el mensaje al reiniciar el formulario
    setClienteYaExiste(false); // Resetear el mensaje al reiniciar el formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Datos del Cliente</h3>
        <label>
          <input 
            type="radio" 
            value={false}
            checked={!clienteExistente}
            onChange={() => setClienteExistente(false)}
          />
          Cliente Nuevo
        </label>
        <label>
          <input 
            type="radio" 
            value={true}
            checked={clienteExistente}
            onChange={() => setClienteExistente(true)}
          />
          Cliente Existente
        </label>
      </div>

      {clienteExistente ? (
        <div>
          <label>Cédula o NIT:</label>
          <input 
            type="text" 
            value={cedula}
            onChange={handleCedulaChange}
            required 
          />
          {clienteNoExiste && <p style={{ color: 'red' }}>El cliente no existe</p>}
        </div>
      ) : (
        <>
          <div>
            <label>Cédula o NIT:</label>
            <input 
              type="text" 
              value={cedula}
              onChange={handleCedulaChange}
              required 
            />
            {clienteYaExiste && <p style={{ color: 'red' }}>Cliente ya existe</p>}
          </div>
          <div>
            <label>Nombre o Razón Social:</label>
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
        </>
      )}

      <div>
        <h3>Datos de la Orden de Compra</h3>
        <label>Vendedor:</label>
        <select 
          value={vendedor} 
          onChange={(e) => setVendedor(e.target.value)}
          required
        >
          <option value="">Seleccione un vendedor</option>
          {vendedores.map(vendedor => (
            <option key={vendedor.id} value={vendedor.id}>{vendedor.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha de Venta:</label>
        <input 
          type="date" 
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Valor de Venta:</label>
        <input 
          type="number" 
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Estado:</label>
        <select 
          value={estado} 
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="pendiente">Pendiente</option>
          <option value="completa">Completa</option>
        </select>
      </div>
      <div>
        <label>Número de Orden de Compra:</label>
        <input 
          type="text" 
          value={numeroOrden}
          onChange={(e) => setNumeroOrden(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Fecha de Entrega:</label>
        <input 
          type="date" 
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
          required 
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default OrdenCompraForm;
















