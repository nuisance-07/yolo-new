import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import ProductReviews from './ProductReviews';

function ProductDetail(props) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products`)
            .then(res => {
                const foundProduct = res.data.find(p => p._id === id);
                setProduct(foundProduct);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!product) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="product-detail-container">
            <div className="container-fluid p-0">
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <img src={product.photo} alt={product.name} className="detail-img" />
                    </div>
                    <div className="col-md-6 detail-info">
                        <h1 className="detail-title">{product.name}</h1>
                        <p className="detail-price">${product.price}</p>
                        <p className="detail-desc">{product.description}</p>

                        <div className="mb-4">
                            <button className="btn-add-cart" onClick={() => addToCart(product)}>
                                Add to Cart
                            </button>
                        </div>

                        {/* Admin Actions */}
                        <div className="mt-3">
                            <Link to={`/product/${product._id}/edit`} className="btn btn-link text-muted mr-3">Edit</Link>
                            <button className="btn btn-link text-danger p-0" onClick={() => {
                                if (window.confirm('Are you sure you want to delete this product?')) {
                                    axios.delete(`http://localhost:5000/api/products/${product._id}`)
                                        .then(() => {
                                            window.location.href = '/';
                                        })
                                        .catch(err => console.error(err));
                                }
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <ProductReviews productId={id} reviews={product.reviews || []} onReviewAdded={() => window.location.reload()} />
            </div>
        </div>
    );
}

export default ProductDetail;
