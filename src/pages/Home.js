// src/pages/Home.js

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Clientes from './Clientes';
import Categorias from './Categorias';
import Inventarios from './Inventarios';
import OrdenesCompra from './OrdenesCompra';
import OrdenesPedido from './OrdenesPedido';
import Productos from './Productos';
import Proveedores from './Proveedores';
import Vendedores from './Vendedores';
import FacturasProveedor from './FacturasProveedor';
import EditarOrdenCompraForm from '../components/EditarOrdenCompraForm';
import Login from './Login';
import InventarioList from '../components/InventarioList';
import FacturaProveedorForm from '../components/FacturaProveedorForm';
import RemisionForm from '../components/RemisionForm';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="side-menu">
        <ul>
          <li><Link to="/clientes">Clientes</Link></li>
          <li><Link to="/categorias">Categorías</Link></li>
          <li><Link to="/inventarios">Inventarios</Link></li>
          <li><Link to="/ordenes-compra">Órdenes de Compra</Link></li>
          <li><Link to="/ordenes-pedido">Órdenes de Pedido</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/proveedores">Proveedores</Link></li>
          <li><Link to="/vendedores">Vendedores</Link></li>
          <li><Link to="/facturas-proveedor">Facturas Proveedor</Link></li>
        </ul>
      </nav>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<div>Selecciona una opción del menú</div>} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/inventarios" element={<InventarioList />} />
          <Route path="/facturas-proveedor" element={<FacturasProveedor />} />
          <Route path="/remisiones" element={<RemisionForm />} />
          <Route path="/ordenes-compra" element={<OrdenesCompra />} />
          <Route path="/ordenes-pedido" element={<OrdenesPedido />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/vendedores" element={<Vendedores />} />
          <Route path="/ordenes-compra/editar/:id" element={<EditarOrdenCompraForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;


