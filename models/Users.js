const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String,
    phoneNo: { type: String, default : '' },
    verificationLink : { type: String, required : true },
    isVerified: { type : Number, default : 1 }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);    