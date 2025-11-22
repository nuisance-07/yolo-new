import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Default_image from '../images/product_image.jpeg'


function Product(props) {


    return (
        <React.Fragment>
            <div className="col-12 col-sm-12 col-md-4" >
                <Link to={`/product/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="product">
                        <div className="product-img">
                            <img
                                src={props.photo ? `http://localhost:5000/images/${props.photo}` : Default_image}
                                className="img-fluid d-block mx-auto"
                                alt={props.name} />
                        </div>
                        <div className="product-name-cost">
                            <h5 className="float-left gold">{props.name} </h5>
                            <h6 className="float-right font-weight-bold"> Ksh  {props.price}</h6>
                        </div>
                        <div >
                        </div>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    )
}

Product.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    photo: PropTypes.string,
    id: PropTypes.string,
    whenProductClicked: PropTypes.func,
}

export default Product;
