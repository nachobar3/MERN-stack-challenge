const express = require('express');
const morgan = require('morgan');
const path = require('path')
const { mongoose } = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000)

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/pairs', require('./routes/pairs.routes'))

// Static files
app.use(express.static(path.join(__dirname + '/public')))


// Starting server
app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
})

