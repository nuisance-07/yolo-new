const mongoose = require('mongoose')
const Schema = mongoose.Schema;

name: String,
    description: String,
        price: Number,
            quantity: Number,
                photo: String,
                    category: String,
                        reviews: [
                            {
                                user: {
                                    type: Schema.Types.ObjectId,
                                    ref: 'user'
                                },
                                name: {
                                    type: String
                                },
                                rating: {
                                    type: Number,
                                    required: true
                                },
                                comment: {
                                    type: String,
                                    required: true
                                },
                                date: {
                                    type: Date,
                                    default: Date.now
                                }
                            }
                        ]
});

let Product = mongoose.model('Product', productSchema)

module.exports = Product;