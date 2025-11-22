import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Product(props) {
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/800x450/1a1a1a/c5a059?text=Product+Image';
    };

    return (
        <div className="col-md-4 col-sm-6">
            <div className="product-card">
                <Link to={`/product/${props.id}`}>
                    <div className="product-img-container">
                        <img
                            src={props.photo}
                            alt={props.name}
                            className="product-img"
                            onError={handleImageError}
                        />
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">{props.name}</h3>
                        <p className="product-price">${props.price}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

Product.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    photo: PropTypes.string,
    id: PropTypes.string
};

export default Product;
