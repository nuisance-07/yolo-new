import React, { useState, useEffect } from 'react';
import Product from './Product';
import PropTypes from 'prop-types';

function ProductList(props) {
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 3;
    const totalPages = Math.ceil(props.productList.length / productsPerPage);

    // Auto-advance every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % totalPages);
        }, 5000);

        return () => clearInterval(interval);
    }, [totalPages]);

    const getCurrentProducts = () => {
        const startIndex = currentPage * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return props.productList.slice(startIndex, endIndex);
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const goToPrevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <div className="product-carousel-container">
            <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevPage}>
                ‹
            </button>

            <div className="product-carousel-wrapper">
                <div className="product-carousel-track">
                    {getCurrentProducts().map((product) => (
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
                </div>
            </div>

            <button className="carousel-arrow carousel-arrow-right" onClick={goToNextPage}>
                ›
            </button>

            <div className="carousel-dots">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === currentPage ? 'active' : ''}`}
                        onClick={() => goToPage(index)}
                        aria-label={`Go to page ${index + 1}`}
                    />
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
