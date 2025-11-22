import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProductReviews = ({ productId, reviews, onReviewAdded }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const { isAuthenticated, token } = useContext(AuthContext);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };
            const body = JSON.stringify({ rating, comment });
            const res = await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, body, config);
            onReviewAdded(res.data);
            setComment('');
            setRating(5);
            setError('');
        } catch (err) {
            setError(err.response && err.response.data.msg ? err.response.data.msg : 'Error adding review');
        }
    };

    return (
        <div className="mt-5">
            <h3>Reviews</h3>
            {reviews.length === 0 && <p>No reviews yet.</p>}
            {reviews.map((review, index) => (
                <div key={index} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{review.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Rating: {review.rating}/5</h6>
                        <p className="card-text">{review.comment}</p>
                        <p className="card-text"><small className="text-muted">{new Date(review.date).toLocaleDateString()}</small></p>
                    </div>
                </div>
            ))}

            {isAuthenticated ? (
                <div className="card mt-4">
                    <div className="card-body">
                        <h4>Write a Review</h4>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Rating</label>
                                <select className="form-control" value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Comment</label>
                                <textarea className="form-control" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Submit Review</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="alert alert-info mt-4">
                    Please <a href="/login">login</a> to write a review.
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
