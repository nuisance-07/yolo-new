import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { Link } from 'react-router-dom';
// import tshirt from '../images/products/tshirt.png';
// import backpack from '../images/products/backpack.png';
// import pants from '../images/products/pants.png';
// import trekkingshoes from '../images/products/trekkingshoes.png';
// import giacket from '../images/products/giacket.png';
// import tshirt_ladies from '../images/products/tshirt_ladies.png';
// import Default_image from '../images/product_image.jpeg'

// const actualProductList = [
//     {
//         name: 'T-Shirt',
//         price: '599',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at arcu rutrum dolor pellentesque interdum ac id nunc. Ut nunc nunc, mollis vel auctor at, convallis et dolor. Donec felis nisl, ultricies ac lorem mollis, tempus maximus dolor. Maecenas mollis felis nec vulputate faucibus. Curabitur eleifend, felis sit amet fermentum sodales, dolor tellus feugiat turpis, vel placerat justo est luctus dui. Etiam vitae vulputate neque. Etiam tristique interdum laoreet. Pellentesque tincidunt nisi eu eros porta efficitur. Pellentesque sit amet lacus ut libero aliquet pellentesque quis a urna. Duis rutrum odio id sapien aliquet, auctor mattis augue facilisis.',
//         photo: tshirt,
//         quantity: 40,
//         id: "1"
//     },
//     {
//         name: 'BackPack', 
//         price: '1500',
//         quantity: 20,
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at arcu rutrum dolor pellentesque interdum ac id nunc. Ut nunc nunc, mollis vel auctor at, convallis et dolor. Donec felis nisl, ultricies ac lorem mollis, tempus maximus dolor. Maecenas mollis felis nec vulputate faucibus. Curabitur eleifend, felis sit amet fermentum sodales, dolor tellus feugiat turpis, vel placerat justo est luctus dui. Etiam vitae vulputate neque. Etiam tristique interdum laoreet. Pellentesque tincidunt nisi eu eros porta efficitur. Pellentesque sit amet lacus ut libero aliquet pellentesque quis a urna. Duis rutrum odio id sapien aliquet, auctor mattis augue facilisis.',
//         photo: backpack,
//         id: "2"
//     },
//     {
//         name: 'Pants', 
//         price: '1000',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at arcu rutrum dolor pellentesque interdum ac id nunc. Ut nunc nunc, mollis vel auctor at, convallis et dolor. Donec felis nisl, ultricies ac lorem mollis, tempus maximus dolor. Maecenas mollis felis nec vulputate faucibus. Curabitur eleifend, felis sit amet fermentum sodales, dolor tellus feugiat turpis, vel placerat justo est luctus dui. Etiam vitae vulputate neque. Etiam tristique interdum laoreet. Pellentesque tincidunt nisi eu eros porta efficitur. Pellentesque sit amet lacus ut libero aliquet pellentesque quis a urna. Duis rutrum odio id sapien aliquet, auctor mattis augue facilisis.',
//         quantity: 15,
//         photo: pants,
//         id: '3'
//     },
//     {
//         name: 'Trekking Shoes',
//         price: '2000',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at arcu rutrum dolor pellentesque interdum ac id nunc. Ut nunc nunc, mollis vel auctor at, convallis et dolor. Donec felis nisl, ultricies ac lorem mollis, tempus maximus dolor. Maecenas mollis felis nec vulputate faucibus. Curabitur eleifend, felis sit amet fermentum sodales, dolor tellus feugiat turpis, vel placerat justo est luctus dui. Etiam vitae vulputate neque. Etiam tristique interdum laoreet. Pellentesque tincidunt nisi eu eros porta efficitur. Pellentesque sit amet lacus ut libero aliquet pellentesque quis a urna. Duis rutrum odio id sapien aliquet, auctor mattis augue facilisis.',
//         quantity: 10,
//         photo: trekkingshoes,
//         id: '4'
//     },
//     {
//         name: 'Jacket',
//         price: '1500',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at arcu rutrum dolor pellentesque interdum ac id nunc. Ut nunc nunc, mollis vel auctor at, convallis et dolor. Donec felis nisl, ultricies ac lorem mollis, tempus maximus dolor. Maecenas mollis felis nec vulputate faucibus. Curabitur eleifend, felis sit amet fermentum sodales, dolor tellus feugiat turpis, vel placerat justo est luctus dui. Etiam vitae vulputate neque. Etiam tristique interdum laoreet. Pellentesque tincidunt nisi eu eros porta efficitur. Pellentesque sit amet lacus ut libero aliquet pellentesque quis a urna. Duis rutrum odio id sapien aliquet, auctor mattis augue facilisis.',
//         quantity: 5,
//         photo: giacket,
//         id: '5'
//     },
//     {
//         name:'T-Shirt Ladies',
//         price: '650',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at arcu rutrum dolor pellentesque interdum ac id nunc. Ut nunc nunc, mollis vel auctor at, convallis et dolor. Donec felis nisl, ultricies ac lorem mollis, tempus maximus dolor. Maecenas mollis felis nec vulputate faucibus. Curabitur eleifend, felis sit amet fermentum sodales, dolor tellus feugiat turpis, vel placerat justo est luctus dui. Etiam vitae vulputate neque. Etiam tristique interdum laoreet. Pellentesque tincidunt nisi eu eros porta efficitur. Pellentesque sit amet lacus ut libero aliquet pellentesque quis a urna. Duis rutrum odio id sapien aliquet, auctor mattis augue facilisis.',
//         quantity: 50,
//         photo: tshirt_ladies,
//         id: '6'
//     }
// ]
class ProductControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actualProductList: [],
            search: '',
            category: ''
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        const { search, category } = this.state;
        let url = 'http://localhost:5000/api/products?';
        if (search) url += `search=${search}&`;
        if (category) url += `category=${category}&`;

        axios.get(url)
            .then(res => {
                this.setState({
                    actualProductList: res.data
                })
            })
            .catch(err => console.log(err));
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value }, this.fetchProducts);
    }

    handleCategoryChange = (e) => {
        this.setState({ category: e.target.value }, this.fetchProducts);
    }

    render() {
        return (
            <React.Fragment>
                <div className="hero-section">
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">Timeless Elegance</h1>
                        <p className="hero-subtitle">Discover the Art of Luxury</p>
                        <button className="btn btn-hero" onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}>
                            Explore Collection
                        </button>
                    </div>
                </div>

                <div className="container" id="collection">
                    <div className="row mb-5 mt-5 align-items-center justify-content-center">
                        <div className="col-md-8 text-center">
                            <h2 className="mb-4">The Collection</h2>
                            <p className="text-muted">Curated pieces for the discerning individual.</p>
                        </div>
                    </div>

                    <div className="row mb-4 align-items-center">
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={this.state.search}
                                onChange={this.handleSearchChange}
                            />
                        </div>
                        <div className="col-md-5">
                            <select className="form-control" value={this.state.category} onChange={this.handleCategoryChange}>
                                <option value="">All Categories</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                                <option value="Watches">Watches</option>
                                <option value="Jewellery">Jewellery</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <Link to="/product/new" className="btn btn-primary btn-block">Add Product</Link>
                        </div>
                    </div>
                    <ProductList productList={this.state.actualProductList} />
                </div>
            </React.Fragment>
        )
    }
}

export default ProductControl;
