import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };

                const ordersRes = await axios.get('http://localhost:5000/api/orders/all', config);
                setOrders(ordersRes.data);

                const productsRes = await axios.get('http://localhost:5000/api/products');
                setProducts(productsRes.data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }, config);

            // Update local state
            setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                // Note: Delete route might need auth middleware if not already protected
                await axios.delete(`http://localhost:5000/api/products/${productId}`);
                setProducts(products.filter(p => p._id !== productId));
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Admin Dashboard</h2>

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>Products</button>
                </li>
            </ul>

            {activeTab === 'orders' && (
                <div>
                    <h3>Recent Orders</h3>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id.substring(0, 8)}...</td>
                                        <td>{order.user ? order.user.email : 'Unknown'}</td>
                                        <td>{new Date(order.date).toLocaleDateString()}</td>
                                        <td>${order.totalAmount}</td>
                                        <td>
                                            <span className={`badge badge-${order.status === 'Pending' ? 'warning' : order.status === 'Shipped' ? 'info' : 'success'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className="form-control form-control-sm"
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'products' && (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3>Products</h3>
                        <Link to="/product/new" className="btn btn-primary">Add New Product</Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td><img src={product.photo} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <Link to={`/product/${product._id}/edit`} className="btn btn-sm btn-warning mr-2">Edit</Link>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
