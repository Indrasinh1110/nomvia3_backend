const User = require('../models/User');

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid })
            .populate('friends', 'name username profileImage')
            .populate('agenciesFollowing', 'name logoUrl') // Assuming Agency model/fields
            .populate('tripsBooked', 'title startDate');   // Assuming Trip model/fields

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get Me Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/update-profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fields to update
        const { name, bio, username, phone, profileImage, travellerType } = req.body;

        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (username) user.username = username;
        if (phone) user.phone = phone;
        if (profileImage) user.profileImage = profileImage;
        if (travellerType) user.travellerType = travellerType;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getMe, updateProfile };
