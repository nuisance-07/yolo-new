const mongoose = require('mongoose');
const Product = require('./models/Products');
require('dotenv').config();

const products = [
    // Men's Collection
    {
        name: 'Italian Wool Suit',
        price: 1200,
        description: 'Hand-tailored Italian wool suit in charcoal grey. Perfect for the modern gentleman.',
        photo: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 15,
        category: 'Men'
    },
    {
        name: 'Cashmere Turtleneck',
        price: 350,
        description: 'Luxuriously soft cashmere turtleneck sweater in midnight blue.',
        photo: 'https://images.unsplash.com/photo-1624223354576-432958b73682?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 25,
        category: 'Men'
    },
    {
        name: 'Oxford Leather Brogues',
        price: 450,
        description: 'Handcrafted leather brogues with intricate detailing.',
        photo: 'https://images.unsplash.com/photo-1478186111890-6eb94f668388?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 20,
        category: 'Men'
    },

    // Women's Collection
    {
        name: 'Silk Evening Gown',
        price: 1800,
        description: 'Elegant floor-length silk gown in emerald green.',
        photo: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 10,
        category: 'Women'
    },
    {
        name: 'Designer Leather Tote',
        price: 950,
        description: 'Spacious and stylish leather tote bag with gold hardware.',
        photo: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 15,
        category: 'Women'
    },
    {
        name: 'Cashmere Wrap Coat',
        price: 1100,
        description: 'Classic camel cashmere coat with a belted waist.',
        photo: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 12,
        category: 'Women'
    },

    // Kids' Collection
    {
        name: 'Petite Velvet Dress',
        price: 180,
        description: 'Adorable velvet dress for special occasions.',
        photo: 'https://images.unsplash.com/photo-1621452773781-0f992ee03591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 20,
        category: 'Kids'
    },
    {
        name: 'Junior Tuxedo Set',
        price: 250,
        description: 'Miniature tuxedo set for the little gentleman.',
        photo: 'https://images.unsplash.com/photo-1519238263496-636027cb46f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 15,
        category: 'Kids'
    },

    // Watches
    {
        name: 'Chronograph Master',
        price: 5500,
        description: 'Swiss-made automatic chronograph with a stainless steel bracelet.',
        photo: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 5,
        category: 'Watches'
    },
    {
        name: 'Gold Vintage Timepiece',
        price: 8200,
        description: '18k gold vintage-inspired watch with a leather strap.',
        photo: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 3,
        category: 'Watches'
    },
    {
        name: 'Minimalist Diver',
        price: 3200,
        description: 'Professional diver watch with 300m water resistance.',
        photo: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 8,
        category: 'Watches'
    },

    // Jewellery
    {
        name: 'Diamond Tennis Bracelet',
        price: 4500,
        description: 'Classic diamond tennis bracelet set in white gold.',
        photo: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 5,
        category: 'Jewellery'
    },
    {
        name: 'Pearl Drop Earrings',
        price: 850,
        description: 'Elegant freshwater pearl drop earrings.',
        photo: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 15,
        category: 'Jewellery'
    },
    {
        name: 'Gold Signet Ring',
        price: 600,
        description: 'Solid gold signet ring, suitable for engraving.',
        photo: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 10,
        category: 'Jewellery'
    },

    // Accessories
    {
        name: 'Aviator Sunglasses',
        price: 280,
        description: 'Classic aviator sunglasses with polarized lenses.',
        photo: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 30,
        category: 'Accessories'
    },
    {
        name: 'Silk Scarf',
        price: 150,
        description: 'Printed silk scarf, hand-rolled edges.',
        photo: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        quantity: 25,
        category: 'Accessories'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/yolomy', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected for Seeding');

        await Product.deleteMany({});
        console.log('Products Cleared');

        await Product.insertMany(products);
        console.log('Products Seeded Successfully');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
