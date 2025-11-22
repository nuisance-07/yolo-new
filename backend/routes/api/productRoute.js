const express = require('express')
const router = express.Router();

// Product Model
const Product = require('../../models/Products');
const upload = require('../../upload');
const auth = require('../../middleware/auth');


// @route GET /products
// @desc Get ALL products with optional filtering
router.get('/', (req, res) => {
    let query = {};
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
    }
    if (req.query.category) {
        query.category = req.query.category;
    }

    // Fetch all products from database
    Product.find(query, (error, products) => {
        if (error) console.log(error)
        res.json(products)
    })
})

// @route POST /products/:id/reviews
// @desc  Create new review
router.post('/:id/reviews', auth, (req, res) => {
    const { rating, comment } = req.body;

    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                const alreadyReviewed = product.reviews.find(
                    r => r.user.toString() === req.user.id.toString()
                );

                if (alreadyReviewed) {
                    return res.status(400).json({ msg: 'Product already reviewed' });
                }

                const review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment,
                    user: req.user.id
                };

                product.reviews.push(review);

                product.save().then(updatedProduct => res.json(updatedProduct));
            } else {
                res.status(404).json({ msg: 'Product not found' });
            }
        })
        .catch(err => res.status(404).json({ msg: 'Product not found' }));
});

// @route POST /products
// @desc  Create a product
router.post('/', upload, (req, res) => {

    // Create a product item
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        photo: req.file ? req.file.filename : ''
    });

    newProduct.save((err, product) => {
        if (err) console.log(err)
        res.json(product)
    })
})
// @route PUT api/products/:id
// @desc  Update a product
router.put('/:id', (req, res) => {
    // Update a product in the database
    Product.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        photo: req.body.photo
    }, { upsert: true }, (err) => {
        if (err) console.log(err);
        res.json({ success: true })
    })
})
// @route DELETE api/products/:id
// @desc  Delete a product
router.delete('/:id', (req, res) => {
    // Delete a product from database
    Product.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            console.log(err)
            res.json({ success: false })
        } else {
            res.json({ success: true })
        }
    })
})

module.exports = router;