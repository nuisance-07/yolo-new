const mongoose = require('mongoose');
const Product = require('./models/Products');
require('dotenv').config();

const products = [
    // Men's Collection
    {
        name: 'Italian Wool Suit',
        price: 1200,
        description: 'Hand-tailored Italian wool suit in charcoal grey. Perfect for the modern gentleman.',
        photo: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
        quantity: 15,
        category: 'Men'
    },
    {
        name: 'Cashmere Turtleneck',
        price: 350,
        description: 'Luxuriously soft cashmere turtleneck sweater in midnight blue.',
        photo: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
        quantity: 25,
        category: 'Men'
    },
    {
        name: 'Oxford Leather Brogues',
        price: 450,
        description: 'Handcrafted leather brogues with intricate detailing.',
        photo: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
        quantity: 20,
        category: 'Men'
    },

    // Women's Collection
    {
        name: 'Silk Evening Gown',
        price: 1800,
        description: 'Elegant floor-length silk gown in emerald green.',
        photo: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
        quantity: 10,
        category: 'Women'
    },
    {
        name: 'Designer Leather Tote',
        price: 950,
        description: 'Spacious and stylish leather tote bag with gold hardware.',
        photo: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
        quantity: 15,
        category: 'Women'
    },
    {
        name: 'Cashmere Wrap Coat',
        price: 1100,
        description: 'Classic camel cashmere coat with a belted waist.',
        photo: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
        quantity: 12,
        category: 'Women'
    },

    // Kids' Collection
    {
        name: 'Petite Velvet Dress',
        price: 180,
        description: 'Adorable velvet dress for special occasions.',
        photo: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
        quantity: 20,
        category: 'Kids'
    },
    {
        name: 'Junior Tuxedo Set',
        price: 250,
        description: 'Miniature tuxedo set for the little gentleman.',
        photo: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
        quantity: 15,
        category: 'Kids'
    },

    // Watches
    {
        name: 'Chronograph Master',
        price: 5500,
        description: 'Swiss-made automatic chronograph with a stainless steel bracelet.',
        photo: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
        quantity: 5,
        category: 'Watches'
    },
    {
        name: 'Gold Vintage Timepiece',
        price: 8200,
        description: '18k gold vintage-inspired watch with a leather strap.',
        photo: 'https://images.unsplash.com/photo-1587836374062-d47b01513ddb?auto=format&fit=crop&w=800&q=80',
        quantity: 3,
        category: 'Watches'
    },
    {
        name: 'Minimalist Diver',
        price: 3200,
        description: 'Professional diver watch with 300m water resistance.',
        photo: 'https://images.unsplash.com/photo-1606390797419-0c0fb0e41e62?auto=format&fit=crop&w=800&q=80',
        quantity: 8,
        category: 'Watches'
    },

    // Jewellery
    {
        name: 'Diamond Tennis Bracelet',
        price: 4500,
        description: 'Classic diamond tennis bracelet set in white gold.',
        photo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
        quantity: 5,
        category: 'Jewellery'
    },
    {
        name: 'Pearl Drop Earrings',
        price: 850,
        description: 'Elegant freshwater pearl drop earrings.',
        photo: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
        quantity: 15,
        category: 'Jewellery'
    },
    {
        name: 'Gold Signet Ring',
        price: 600,
        description: 'Solid gold signet ring, suitable for engraving.',
        photo: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
        quantity: 10,
        category: 'Jewellery'
    },

    // Accessories
    {
        name: 'Aviator Sunglasses',
        price: 280,
        description: 'Classic aviator sunglasses with polarized lenses.',
        photo: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
        quantity: 30,
        category: 'Accessories'
    },
    {
        name: 'Silk Scarf',
        price: 150,
        description: 'Printed silk scarf, hand-rolled edges.',
        photo: 'https://images.unsplash.com/photo-1601924638867-56e2e87b9e4d?auto=format&fit=crop&w=800&q=80',
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
