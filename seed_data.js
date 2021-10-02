'use strict';

const faker = require('faker');
const mongoose = require('mongoose');
const User = require('./src/user/model');
const Follow = require('./src/follow/model');

const randomInt = (max) => {
    return Math.floor(Math.random() * max);
}

mongoose.connect('mongodb://localhost:27017', async () => {
    console.log('Connected to mongoDB');

    let usersIDs = [];
    for (let i = 0; i < 100; ++i) {
        const user = {
            name: faker.name.firstName(),
            age: Math.floor(Math.random() * 40 + 20),
            email: faker.internet.email(faker.name.firstName(), faker.name.lastName()),
        };
        const savedUser = await User.insertUser(user);
        usersIDs.push(savedUser._id.toString());
    }
    console.log('Users saved');
    let followArray = [];
    let from = randomInt(100);
    let to = randomInt(100);
    while (from === to) {
        to = randomInt(100);
    }
    for (let i = 0; i < 300; ++i) {
        while (followArray.findIndex(item => item.from === usersIDs[from] && item.to === usersIDs[to] ) !== -1) {
            from = randomInt(100);
            to = randomInt(100);
            while (from === to) {
                to = randomInt(100);
            }
        }
        await Follow.insertFollow({ from: usersIDs[from], to: usersIDs[to] });
        followArray.push({ from: usersIDs[from], to: usersIDs[to] });
    }
    console.log('Connections saved');
    mongoose.connection.close();
});
