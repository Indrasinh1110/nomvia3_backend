const { admin } = require('../config/firebase');
const User = require('../models/User');

// @desc    Verify Firebase ID Token and sync user with MongoDB
// @route   POST /api/auth/verify
// @access  Public (Token validated inside)
const verifyUser = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ message: 'ID Token is required' });
    }

    try {
        // 1. Verify ID Token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        // 2. Check if user exists in MongoDB
        let user = await User.findOne({ firebaseUid: uid });

        if (user) {
            // 3a. User exists - Return user
            // Optional: Update profile image or name if changed? For now, we keep it simple.
            return res.status(200).json(user);
        } else {
            // 3b. User does not exist - Create new user
            // Attempt to generate a unique username from email prefix or random string
            let baseUsername = email.split('@')[0];
            let uniqueUsername = baseUsername;
            let counter = 1;

            // Simple check to ensure uniqueness (basic collision resolution)
            while (await User.findOne({ username: uniqueUsername })) {
                uniqueUsername = `${baseUsername}${counter}`;
                counter++;
            }

            user = await User.create({
                firebaseUid: uid,
                name: name || 'Nomad', // Fallback
                email: email,
                profileImage: picture || '',
                username: uniqueUsername
            });

            return res.status(201).json(user);
        }
    } catch (error) {
        console.error('Verify Auth Error:', error);
        res.status(401).json({ message: 'Invalid Token or Auth Failed', error: error.message });
    }
};

module.exports = { verifyUser };
