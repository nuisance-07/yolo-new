import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { token, logout } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };

                // Fetch User Data
                const userRes = await axios.get('http://localhost:5000/api/auth/user', config);
                setUser(userRes.data);

                // Fetch Orders
                const ordersRes = await axios.get('http://localhost:5000/api/orders', config);
                setOrders(ordersRes.data);

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

    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <h3 className="card-title mb-3">My Profile</h3>
                            {user && (
                                <>
                                    <p className="card-text"><strong>Name:</strong> {user.name}</p>
                                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                                    <button className="btn btn-danger mt-3" onClick={logout}>Logout</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <h3 className="mb-4">Order History</h3>
                    {orders.length === 0 ? (
                        <div className="alert alert-info">No orders found.</div>
                    ) : (
                        <div className="list-group">
                            {orders.map(order => (
                                <div key={order._id} className="list-group-item flex-column align-items-start mb-3 border rounded">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Order #{order._id.substring(0, 8)}...</h5>
                                        <small className="text-muted">{new Date(order.date).toLocaleDateString()}</small>
                                    </div>
                                    <p className="mb-1"><strong>Status:</strong> <span className={`badge badge-${order.status === 'Pending' ? 'warning' : 'success'}`}>{order.status}</span></p>
                                    <p className="mb-1"><strong>Total:</strong> ${order.totalAmount}</p>
                                    <div className="mt-2">
                                        <h6>Items:</h6>
                                        <ul className="list-unstyled pl-3">
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    {item.name} x {item.quantity} - ${item.price * item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
