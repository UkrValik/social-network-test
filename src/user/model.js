'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

class User {

    constructor() {

        const userSchema = new Schema({
            name: { type: String, required: true },
            age: { type: Number, required: true },
            email: { type: String, required: true },
        });

        userSchema.statics.insertUser = this.insertUser;
        userSchema.statics.findById = this.findById;

        this.User = mongoose.model('User', userSchema);
    }

    insertUser(user) {
        return this.User.create(user);
    }

    findById(id) {
        return this.User.findOne({ _id: id });
    }
}

module.exports = new User();
