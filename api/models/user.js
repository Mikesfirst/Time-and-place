const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    birthday: Date,
    email: {
        type: String,
        required: true
    },
    phoneNumber: Number,
    password: {
        type: String,
        required: true
    },
    profilePictures: [String],
    bio: String,
    datesPlanned: [mongoose.Schema.Types.Mixed], // Can be Date or ObjectId
    notInterested: mongoose.Schema.Types.ObjectId,
    invitations: [mongoose.Schema.Types.Mixed], // Can be Date or ObjectId
    likes: {
        type: Number,
        default: 0
    },
    verificationToken: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
