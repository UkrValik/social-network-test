'use strict';

const express = require('express');
const { countFriends, popularUsers } = require('../follow');

const app = express();

app.get('/friendscount', countFriends);
app.get('/popular', popularUsers);

module.exports = { app };
