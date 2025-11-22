import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your Cart is Empty</h2>
                <Link to="/" className="btn btn-primary mt-3">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="row">
                <div className="col-md-8">
                    {cart.map(item => (
                        <div key={item._id} className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-md-2">
                                    {/* Placeholder for image if not available, or use item.photo */}
                                    <img src={item.photo ? `http://localhost:5000/images/${item.photo}` : 'https://via.placeholder.com/150'} className="card-img" alt={item.name} style={{ height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Price: ${item.price}</p>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex align-items-center justify-content-center">
                                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Cart Summary</h5>
                            <p className="card-text">Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            <h4 className="card-text">Total: ${getCartTotal()}</h4>
                            <hr />
                            <Link to="/checkout" className="btn btn-success btn-block">Proceed to Checkout</Link>
                            <button className="btn btn-outline-danger btn-block mt-2" onClick={clearCart}>Clear Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
