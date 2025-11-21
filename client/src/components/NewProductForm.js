import React from 'react';
// import {v4} from 'uuid';
import PropTypes from 'prop-types';
import ReusableForm from './ReusableForm';

function NewProductForm(props) {


    const [selectedFile, setSelectedFile] = React.useState(null);

    function handleImageChange(event) {
        setSelectedFile(event.target.files[0]);
    }


    function handleNewProductFormSubmission(event) {
        // event.persist()
        event.preventDefault();

        // console.log(event.target.name.value);
        // console.log(event.target.price.value);
        // console.log(event.target.files[0]);
        // console.log(photo)

        props.onNewProductCreation({
            name: event.target.name.value,
            price: event.target.price.value,
            description: event.target.description.value,
            quantity: event.target.quantity.value,
            image: selectedFile
        });

    }

    return (
        <React.Fragment>
            <div className="container product-form">
                <ReusableForm
                    formSubmissionHandler={handleNewProductFormSubmission}
                    onFileChange={handleImageChange}
                    buttonText='Add Product' />

            </div>
        </React.Fragment>
    )

}

NewProductForm.propTypes = {
    onNewProductCreation: PropTypes.func
}

export default NewProductForm;
