const mongoose = require('mongoose');
const Product = require('./models/Products');
require('dotenv').config();

const products = [
    // Smartphones
    {
        name: 'Galaxy Ultra 5G',
        price: 1199,
        description: 'Latest flagship smartphone with 108MP camera and 120Hz display.',
        photo: 'https://images.unsplash.com/photo-1610945265078-38584e2690e0?w=800&q=80',
        quantity: 50,
        category: 'Smartphones'
    },
    {
        name: 'iPhone 15 Pro Max',
        price: 1299,
        description: 'Titanium design, A17 Pro chip, and the most powerful iPhone camera system.',
        photo: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
        quantity: 45,
        category: 'Smartphones'
    },
    {
        name: 'Pixel 8 Pro',
        price: 999,
        description: 'Google AI, pro-level triple rear camera system, and 24-hour battery.',
        photo: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80',
        quantity: 30,
        category: 'Smartphones'
    },
    {
        name: 'OnePlus 11',
        price: 699,
        description: 'Snapdragon 8 Gen 2, 100W SUPERVOOC charging, and Hasselblad camera.',
        photo: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800&q=80',
        quantity: 25,
        category: 'Smartphones'
    },

    // Laptops
    {
        name: 'MacBook Pro 16"',
        price: 2499,
        description: 'Supercharged by M3 Max. The most powerful MacBook Pro ever.',
        photo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&q=80',
        quantity: 20,
        category: 'Laptops'
    },
    {
        name: 'Dell XPS 15',
        price: 1899,
        description: 'High-performance laptop with 4K OLED display and carbon fiber palm rest.',
        photo: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&q=80',
        quantity: 15,
        category: 'Laptops'
    },
    {
        name: 'ASUS ROG Zephyrus',
        price: 2199,
        description: 'Ultra-slim gaming laptop with RTX 4080 and Nebula HDR Display.',
        photo: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
        quantity: 10,
        category: 'Laptops'
    },
    {
        name: 'HP Spectre x360',
        price: 1599,
        description: '2-in-1 convertible laptop with stunning design and long battery life.',
        photo: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&q=80',
        quantity: 12,
        category: 'Laptops'
    },

    // Audio
    {
        name: 'Sony WH-1000XM5',
        price: 399,
        description: 'Industry-leading noise canceling headphones with exceptional sound.',
        photo: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
        quantity: 40,
        category: 'Audio'
    },
    {
        name: 'AirPods Max',
        price: 549,
        description: 'High-fidelity audio with Active Noise Cancellation and Transparency mode.',
        photo: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&q=80',
        quantity: 30,
        category: 'Audio'
    },
    {
        name: 'Bose QuietComfort 45',
        price: 329,
        description: 'Iconic quiet, comfort, and sound. The perfect travel companion.',
        photo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
        quantity: 35,
        category: 'Audio'
    },
    {
        name: 'Sennheiser Momentum 4',
        price: 349,
        description: 'Audiophile-inspired sound with 60-hour battery life.',
        photo: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&q=80',
        quantity: 20,
        category: 'Audio'
    },
    {
        name: 'Sonos Era 300',
        price: 449,
        description: 'Next-level spatial audio speaker with Dolby Atmos support.',
        photo: 'https://images.unsplash.com/photo-1543512214-318c77a07298?w=800&q=80',
        quantity: 15,
        category: 'Audio'
    },
    {
        name: 'JBL Flip 6',
        price: 129,
        description: 'Bold sound for every adventure. Waterproof and dustproof.',
        photo: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
        quantity: 50,
        category: 'Audio'
    },

    // TVs
    {
        name: 'LG C3 OLED 65"',
        price: 1699,
        description: 'The world\'s #1 OLED TV brand. Perfect black, infinite contrast.',
        photo: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
        quantity: 10,
        category: 'TVs'
    },
    {
        name: 'Samsung S95C OLED',
        price: 2499,
        description: 'Quantum HDR OLED+ with Infinity One Design.',
        photo: 'https://images.unsplash.com/photo-1593784653277-9471b1374021?w=800&q=80',
        quantity: 8,
        category: 'TVs'
    },
    {
        name: 'Sony Bravia XR A95L',
        price: 3299,
        description: 'The ultimate QD-OLED TV with Cognitive Processor XR.',
        photo: 'https://images.unsplash.com/photo-1509281373149-e957c629640d?w=800&q=80',
        quantity: 5,
        category: 'TVs'
    },

    // Gaming
    {
        name: 'PlayStation 5',
        price: 499,
        description: 'Experience lightning fast loading with an ultra-high speed SSD.',
        photo: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
        quantity: 25,
        category: 'Gaming'
    },
    {
        name: 'Xbox Series X',
        price: 499,
        description: 'The fastest, most powerful Xbox ever.',
        photo: 'https://images.unsplash.com/photo-1621259182902-4809703b3c1e?w=800&q=80',
        quantity: 25,
        category: 'Gaming'
    },
    {
        name: 'Nintendo Switch OLED',
        price: 349,
        description: '7-inch OLED screen, wide adjustable stand, and enhanced audio.',
        photo: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80',
        quantity: 40,
        category: 'Gaming'
    },
    {
        name: 'Meta Quest 3',
        price: 499,
        description: 'The most powerful Meta Quest yet. Mixed reality headset.',
        photo: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?w=800&q=80',
        quantity: 20,
        category: 'Gaming'
    },

    // Cameras
    {
        name: 'Sony Alpha a7 IV',
        price: 2498,
        description: 'Full-frame mirrorless camera with 33MP sensor and 4K 60p video.',
        photo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
        quantity: 10,
        category: 'Cameras'
    },
    {
        name: 'Canon EOS R6 Mark II',
        price: 2499,
        description: 'High-speed continuous shooting and advanced subject tracking.',
        photo: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=800&q=80',
        quantity: 12,
        category: 'Cameras'
    },
    {
        name: 'GoPro HERO12 Black',
        price: 399,
        description: 'Unbelievable image quality, even better HyperSmooth video stabilization.',
        photo: 'https://images.unsplash.com/photo-1564466013704-6d51e8a9362f?w=800&q=80',
        quantity: 30,
        category: 'Cameras'
    },

    // Smart Home
    {
        name: 'Philips Hue Starter Kit',
        price: 199,
        description: 'White and color ambiance smart LED bulbs with bridge.',
        photo: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=800&q=80',
        quantity: 25,
        category: 'Smart Home'
    },
    {
        name: 'Google Nest Hub Max',
        price: 229,
        description: 'Smart display with Google Assistant and built-in Nest Cam.',
        photo: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&q=80',
        quantity: 20,
        category: 'Smart Home'
    },

    // Wearables
    {
        name: 'Apple Watch Ultra 2',
        price: 799,
        description: 'The most rugged and capable Apple Watch. Designed for outdoor adventure.',
        photo: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
        quantity: 25,
        category: 'Wearables'
    },
    {
        name: 'Garmin Fenix 7 Pro',
        price: 799,
        description: 'Multisport GPS smartwatch with solar charging and flashlight.',
        photo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        quantity: 15,
        category: 'Wearables'
    },

    // Accessories
    {
        name: 'Anker 737 Power Bank',
        price: 149,
        description: 'Ultra-powerful two-way charging with 24,000mAh capacity.',
        photo: 'https://images.unsplash.com/photo-1609592424398-319595a89767?w=800&q=80',
        quantity: 50,
        category: 'Accessories'
    },
    {
        name: 'Logitech MX Master 3S',
        price: 99,
        description: 'Performance wireless mouse with 8K DPI tracking.',
        photo: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
        quantity: 40,
        category: 'Accessories'
    },
    {
        name: 'Keychron Q1 Pro',
        price: 199,
        description: 'Wireless custom mechanical keyboard with QMK/VIA support.',
        photo: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
        quantity: 20,
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
