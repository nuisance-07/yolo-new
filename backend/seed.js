const mongoose = require('mongoose');
const Product = require('./models/Products');
require('dotenv').config();

const products = [
    // Men's Collection
    {
        name: 'Italian Wool Suit',
        price: 1200,
        description: 'Hand-tailored Italian wool suit in charcoal grey. Perfect for the modern gentleman.',
        photo: 'https://picsum.photos/seed/suit/800/600',
        quantity: 15,
        category: 'Men'
    },
    {
        name: 'Cashmere Turtleneck',
        price: 350,
        description: 'Luxuriously soft cashmere turtleneck sweater in midnight blue.',
        photo: 'https://picsum.photos/seed/turtleneck/800/600',
        quantity: 25,
        category: 'Men'
    },
    {
        name: 'Oxford Leather Brogues',
        price: 450,
        description: 'Handcrafted leather brogues with intricate detailing.',
        photo: 'https://picsum.photos/seed/brogues/800/600',
        quantity: 20,
        category: 'Men'
    },

    // Women's Collection
    {
        name: 'Silk Evening Gown',
        price: 1800,
        description: 'Elegant floor-length silk gown in emerald green.',
        photo: 'https://picsum.photos/seed/gown/800/600',
        quantity: 10,
        category: 'Women'
    },
    {
        name: 'Designer Leather Tote',
        price: 950,
        description: 'Spacious and stylish leather tote bag with gold hardware.',
        photo: 'https://picsum.photos/seed/tote/800/600',
        quantity: 15,
        category: 'Women'
    },
    {
        name: 'Cashmere Wrap Coat',
        price: 1100,
        description: 'Classic camel cashmere coat with a belted waist.',
        photo: 'https://picsum.photos/seed/coat/800/600',
        quantity: 12,
        category: 'Women'
    },

    // Kids' Collection
    {
        name: 'Petite Velvet Dress',
        price: 180,
        description: 'Adorable velvet dress for special occasions.',
        photo: 'https://picsum.photos/seed/dress/800/600',
        quantity: 20,
        category: 'Kids'
    },
    {
        name: 'Junior Tuxedo Set',
        price: 250,
        description: 'Miniature tuxedo set for the little gentleman.',
        photo: 'https://picsum.photos/seed/tuxedo/800/600',
        quantity: 15,
        category: 'Kids'
    },

    // Watches
    {
        name: 'Chronograph Master',
        price: 5500,
        description: 'Swiss-made automatic chronograph with a stainless steel bracelet.',
        photo: 'https://picsum.photos/seed/watch1/800/600',
        quantity: 5,
        category: 'Watches'
    },
    {
        name: 'Gold Vintage Timepiece',
        price: 8200,
        description: '18k gold vintage-inspired watch with a leather strap.',
        photo: 'https://picsum.photos/seed/watch2/800/600',
        quantity: 3,
        category: 'Watches'
    },
    {
        name: 'Minimalist Diver',
        price: 3200,
        description: 'Professional diver watch with 300m water resistance.',
        photo: 'https://picsum.photos/seed/watch3/800/600',
        quantity: 8,
        category: 'Watches'
    },

    // Jewellery
    {
        name: 'Diamond Tennis Bracelet',
        price: 4500,
        description: 'Classic diamond tennis bracelet set in white gold.',
        photo: 'https://picsum.photos/seed/bracelet/800/600',
        quantity: 5,
        category: 'Jewellery'
    },
    {
        name: 'Pearl Drop Earrings',
        price: 850,
        description: 'Elegant freshwater pearl drop earrings.',
        photo: 'https://picsum.photos/seed/earrings/800/600',
        quantity: 15,
        category: 'Jewellery'
    },
    {
        name: 'Gold Signet Ring',
        price: 600,
        description: 'Solid gold signet ring, suitable for engraving.',
        photo: 'https://picsum.photos/seed/ring/800/600',
        quantity: 10,
        category: 'Jewellery'
    },

    // Accessories
    {
        name: 'Aviator Sunglasses',
        price: 280,
        description: 'Classic aviator sunglasses with polarized lenses.',
        photo: 'https://picsum.photos/seed/glasses/800/600',
        quantity: 30,
        category: 'Accessories'
    },
    {
        name: 'Silk Scarf',
        price: 150,
        description: 'Printed silk scarf, hand-rolled edges.',
        photo: 'https://picsum.photos/seed/scarf/800/600',
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
