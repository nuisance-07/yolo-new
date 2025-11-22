import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useContext(CartContext);
    const { isAuthenticated, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');

    if (!isAuthenticated) {
        return (
            <div className="container mt-5 text-center">
                <h2>Please Login to Checkout</h2>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/login')}>Login</button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your Cart is Empty</h2>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Go Shopping</button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };

            const orderData = {
                items: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: getCartTotal(),
                shippingAddress: {
                    address,
                    city,
                    postalCode,
                    country
                }
            };

            await axios.post('http://localhost:5000/api/orders', orderData, config);
            clearCart();
            alert('Order placed successfully!');
            navigate('/');
        } catch (err) {
            setError('Error placing order. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header">Shipping Address</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>City</label>
                                        <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Country</label>
                                        <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label>Postal Code</label>
                                        <input type="text" className="form-control" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                                    </div>
                                </div>

                                <hr className="my-4" />
                                <h4 className="mb-3">Payment Details</h4>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input type="text" className="form-control" placeholder="0000 0000 0000 0000" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Expiry Date</label>
                                        <input type="text" className="form-control" placeholder="MM/YY" required />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>CVC</label>
                                        <input type="text" className="form-control" placeholder="123" required />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success btn-block mt-3">Place Order</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Order Summary</div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {cart.map(item => (
                                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {item.name} x {item.quantity}
                                        <span>${item.price * item.quantity}</span>
                                    </li>
                                ))}
                                <li className="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
                                    Total
                                    <span>${getCartTotal()}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
