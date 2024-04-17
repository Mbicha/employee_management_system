const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: { type: String, required: true, proper: true },
    last_name: { type: String, required: true, proper: true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    photo: String,
    phone: { type: String, required: true },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    marital_status: {
        type: String,
        enum: ['Married', 'Single', 'Separated', 'Divorsed', 'Come we stay']
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    next_of_kin: {
        type: String 
    },
    next_of_kin_contact: {
        type: String
    },
    next_of_kin_relationship: {
        type: String,
        enum: ['Spouce', 'Mother', 'Father','Son', 'Doughter', 'Relative', 'Prefer not say']
    },
    health_condition: {
        type: String,
        enum: ['Yes', 'No']
    },
    what_condition: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false
    },
    confirm_password: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords do not match"
        }
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

// Middleware to set created_date and update updated_date
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.confirm_password = undefined;

    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

module.exports = mongoose.model("User", userSchema);
