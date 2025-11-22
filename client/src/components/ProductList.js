import React from 'react';
import Product from './Product';
import PropTypes from 'prop-types';

function ProductList(props) {
    return (
        <div className="product-carousel-container">
            <div className="product-carousel-track">
                {props.productList.map((product) => (
                    <div key={product._id} className="product-carousel-item">
                        <Product
                            name={product.name}
                            price={product.price}
                            photo={product.photo}
                            description={product.description}
                            id={product._id}
                        />
                    </div>
                ))}
                {/* Duplicate for infinite scroll effect */}
                {props.productList.map((product) => (
                    <div key={`${product._id}-dup`} className="product-carousel-item">
                        <Product
                            name={product.name}
                            price={product.price}
                            photo={product.photo}
                            description={product.description}
                            id={product._id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    productList: PropTypes.array,
    onProductSelection: PropTypes.func,
};

export default ProductList;
