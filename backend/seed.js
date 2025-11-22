const mongoose = require('mongoose');
const Product = require('./models/Products');
const User = require('./models/User');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yolomy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.log(err));

const seedProducts = [
    {
        name: "Midnight Velvet Blazer",
        description: "A masterpiece of tailoring, this midnight blue velvet blazer features a slim fit, satin lapels, and a single-button closure. Perfect for evening galas or sophisticated gatherings.",
        price: 1250,
        quantity: 10,
        photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
        category: "Men"
    },
    {
        name: "Cashmere Turtleneck",
        description: "Crafted from the finest Mongolian cashmere, this charcoal grey turtleneck offers unparalleled softness and warmth. A timeless essential for the modern wardrobe.",
        price: 450,
        quantity: 25,
        photo: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "Men"
    },
    {
        name: "Silk Chiffon Evening Gown",
        description: "Ethereal and elegant, this floor-length silk chiffon gown in emerald green features a draped bodice and a flowing skirt that moves with grace.",
        price: 2800,
        quantity: 5,
        photo: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "Women"
    },
    {
        name: "Italian Leather Oxford Shoes",
        description: "Handcrafted in Florence, these black leather Oxfords feature a sleek silhouette and a durable leather sole. The epitome of classic formal footwear.",
        price: 890,
        quantity: 15,
        photo: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Men"
    },
    {
        name: "Structured Wool Coat",
        description: "This camel wool coat features a structured shoulder, wide lapels, and a belted waist. A statement piece that combines warmth with high-fashion architecture.",
        price: 1500,
        quantity: 8,
        photo: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "Women"
    },
    {
        name: "Minimalist Linen Shirt",
        description: "Breathable and effortlessly chic, this white linen shirt features a mandarin collar and hidden placket. Ideal for luxury resort wear.",
        price: 220,
        quantity: 30,
        photo: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "Men"
    },
    {
        name: "Pleated Midi Skirt",
        description: "A metallic gold pleated midi skirt that catches the light with every step. Pairs perfectly with a simple silk blouse for a look of understated glamour.",
        price: 550,
        quantity: 12,
        photo: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "Women"
    },
    {
        name: "Aviator Sunglasses",
        description: "Gold-rimmed aviator sunglasses with gradient brown lenses. 100% UV protection with a classic design that never goes out of style.",
        price: 350,
        quantity: 50,
        photo: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Accessories"
    },
    {
        name: "Leather Weekender Bag",
        description: "Full-grain cognac leather weekender bag with brass hardware. Spacious enough for a getaway, stylish enough for the first-class lounge.",
        price: 1100,
        quantity: 7,
        photo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "Accessories"
    },
    {
        name: "Diamond Stud Earrings",
        description: "Simple, brilliant, and flawless. These 1-carat diamond stud earrings set in 18k white gold are the ultimate touch of luxury.",
        price: 5000,
        quantity: 3,
        photo: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        category: "Accessories"
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({});
        console.log('Products Cleared');

        await Product.insertMany(seedProducts);
        console.log('Products Seeded');

        // Optional: Clear orders if you want a fresh start
        // await Order.deleteMany({});
        // console.log('Orders Cleared');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
