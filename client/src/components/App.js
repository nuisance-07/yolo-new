import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import ProductControl from './ProductControl';
import ProductDetail from './ProductDetail';
import EditProduct from './EditProduct';
import NewProduct from './NewProduct';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Cart from './Cart';
import Checkout from './Checkout';
import Profile from './Profile';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <React.Fragment>
            <Header />
            <div className="container">
              <ProductControl />
            </div>
          </React.Fragment>
        } />
        <Route path="/product/new" element={<NewProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/edit" element={<EditProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;
