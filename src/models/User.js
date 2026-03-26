const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true // Allows null/undefined to be unique (if strictly unique is needed, remove sparse and ensure generated)
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
        default: '',
    },
    profileImage: {
        type: String,
        default: '',
    },
    travellerType: {
        type: String,
        enum: ['Solo', 'Group', 'Family', 'Digital Nomad', 'Couple', 'Backpacker'],
        default: 'Solo',
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    agenciesFollowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency', // Assuming Agency model will exist
    }],
    tripsBooked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip', // Assuming Trip model will exist
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
