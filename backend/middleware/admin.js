const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        const user = await User.findById(req.user.id);
        if (user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ msg: 'Access denied. Admin only.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
