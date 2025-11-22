import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReusableForm from './ReusableForm';

const NewProduct = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleNewProductFormSubmission = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', event.target.name.value);
        formData.append('price', event.target.price.value);
        formData.append('description', event.target.description.value);
        formData.append('quantity', event.target.quantity.value);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/');
        } catch (err) {
            console.error('Error creating product:', err);
            alert('Error creating product');
        }
    };

    return (
        <div className="container product-form mt-5">
            <h2 className="text-center mb-4">Add New Product</h2>
            <ReusableForm
                formSubmissionHandler={handleNewProductFormSubmission}
                onFileChange={handleImageChange}
                buttonText='Add Product' />
        </div>
    );
};

export default NewProduct;
