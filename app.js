// NPM Packages
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      dotEnv = require('dotenv'),
      cors = require('cors');

// Routes
const userRoute = require('./routes/user'),
      favoriteRoute = require('./routes/favorite');

// Load enviornment variables
dotEnv.config();

// Configure public headers
app.use(cors());

// Body parser settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Conect to MongoDB Database
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true});

// Passport config
app.use(passport.initialize());

// Routes
app.use('/user', userRoute);
app.use('/api/favorite', favoriteRoute);

// Start server
app.listen(process.env.PORT, process.env.IP, function(){
  console.log(`Server started on ${process.env.IP}:${process.env.PORT}`);
})