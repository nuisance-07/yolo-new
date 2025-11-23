import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaClipboardList, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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

                const ordersRes = await axios.get('/api/orders/all', config);
                setOrders(ordersRes.data);

                const productsRes = await axios.get('/api/products');
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
            await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, config);

            // Update local state
            setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${productId}`);
                setProducts(products.filter(p => p._id !== productId));
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4 text-center font-weight-bold dashboard-title">Admin Dashboard</h2>

            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3 shadow-sm dashboard-card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Total Orders</h5>
                                    <h3 className="card-text">{orders.length}</h3>
                                </div>
                                <FaClipboardList size={40} className="opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3 shadow-sm dashboard-card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Total Products</h5>
                                    <h3 className="card-text">{products.length}</h3>
                                </div>
                                <FaBoxOpen size={40} className="opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-info mb-3 shadow-sm dashboard-card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Total Revenue</h5>
                                    <h3 className="card-text">${totalRevenue.toFixed(2)}</h3>
                                </div>
                                <div className="h1 mb-0 opacity-50">$</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-white">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'orders' ? 'active font-weight-bold' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'products' ? 'active font-weight-bold' : ''}`} onClick={() => setActiveTab('products')}>Products</button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {activeTab === 'orders' && (
                        <div>
                            <h4 className="mb-3">Recent Orders</h4>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="thead-light">
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
                                                <td><span className="text-muted">#{order._id.substring(0, 8)}</span></td>
                                                <td>{order.user ? order.user.email : 'Unknown'}</td>
                                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                                <td className="font-weight-bold">${order.totalAmount}</td>
                                                <td>
                                                    <span className={`badge badge-pill badge-${order.status === 'Pending' ? 'warning' : order.status === 'Shipped' ? 'info' : order.status === 'Delivered' ? 'success' : 'danger'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-control form-control-sm custom-select"
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        style={{ width: '120px' }}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">No orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Product Management</h4>
                                <Link to="/product/new" className="btn btn-primary btn-sm d-flex align-items-center">
                                    <FaPlus className="mr-2" /> Add New Product
                                </Link>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="thead-light">
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
                                                <td>
                                                    <img src={product.photo} alt={product.name} className="rounded" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                </td>
                                                <td className="font-weight-bold">{product.name}</td>
                                                <td>${product.price}</td>
                                                <td><span className="badge badge-secondary">{product.category}</span></td>
                                                <td>
                                                    <span className={product.quantity < 10 ? 'text-danger font-weight-bold' : 'text-success'}>
                                                        {product.quantity}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link to={`/product/${product._id}/edit`} className="btn btn-sm btn-outline-warning mr-2" title="Edit">
                                                        <FaEdit />
                                                    </Link>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(product._id)} title="Delete">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">No products found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
