'use strict';

const { app } = require('./src/app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//mongoose.connect('mongodb://localhost:27017')
mongoose.connect('mongodb://mongo:27017').then(
    () => console.log('Connected to database'),
    (err) => console.log(err)
);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
