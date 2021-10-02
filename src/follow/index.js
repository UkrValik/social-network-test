'use strict';

const Follow = require('./model');
const User = require('../user/model');

const countFriends = async (req, res) => {
    const friends = await Follow.findFriends();
    res.json({ friendsCount: friends.length });
};

const popularUsers = async (req, res) => {
    const results = await Follow.findPopularUsers(3);
    let users = [];
    for (let item of results) {
        const user = await User.findById(item._id);
        users.push(user);
    }
    res.json(users);
}

module.exports = { countFriends, popularUsers };
