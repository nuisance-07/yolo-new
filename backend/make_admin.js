const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/yolomy', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const makeAdmin = async () => {
    try {
        const user = await User.findOne({ email: 'admin@yolo.com' });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }
        user.isAdmin = true;
        await user.save();
        console.log(`User ${user.email} is now an admin`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

makeAdmin();
